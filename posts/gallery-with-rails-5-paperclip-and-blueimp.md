---
title: Gallery with Rails 5, Paperclip and blueimp
created: 2016-10-16
---

Recently I had to build gallery with Rails and it took me a few days finding solutions to my problems on the web. This article is the result of everything I found put together. I'll keep it as brief as possible and if you have any questions please drop me an email and I'll try to explain as best as I can.

Alright, enough chit chat let's roll our sleeves. First we have to create our new project.

```
rails new gallery -T
```

Sweet. Next we'll update our Gemfile

```ruby
# Gemfile

# File upload
gem "paperclip", "~> 5.0.0"
# Forms
gem 'simple_form'
#Bootstrap
gem 'bootstrap-sass', '~> 3.3.6'

```

Run bundle install.  
Install simple_form.

```
rails generate simple_form:install
```

Change the name of your application.css to application.scss and import bootstrap.

```css
/* application.scss */

@import 'bootstrap-sprockets';
@import 'bootstrap';
```

Now that we have all the gems it's time to create our resources. We'll need models and two controllers for Album and Photo. For the Album we'll need all controller actions and for the Photo only destroy action.
Lets start with the Album first.

```
rails g scaffold Album name description
```

This creates the controller, the model and prepares the table for us.
Lets create the controller, model and table for our Photos. We'll need only destroy action, so we run the following generator:

```
rails g controller Photos destroy
```

And for the model:

```
rails g model Photo name imageable:references
```

I've created Photo as polymorophic model for the needs of my project and I'll leave it as polymorphic for this project. It's good to see how polymorphic models are used if you haven't done it before.
Before we run the migration and create the tables, there are some changes we have to do for the photos table.

```ruby
#db/migrations/xxxxxxxxxxxxx_create_photos.rb

t.string :name
t.string :description
t.references :imageable, polymorphic: true, index: true
```

Change the foreign_key: true for polymorphic: true, index: true. This will create the necessary columns for us.

```ruby
rails db:migrate
```

Having the tables ready, it's time to add the fields for paperclip. The simplest way is to run paperclip's generator.

```
rails generate paperclip photo image
```

And `rails db:migarte` again to add the new columns for paperclip to the photos table.  
Now update the models.

```ruby
# album.rb

has_many :photos, as: :imageable, dependent: :destroy
validates_presence_of :name
default_scope -> { order(created_at: :desc) }
```

```ruby
# photo.rb

belongs_to :imageable, polymorphic: true

has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" },
                                            default_url: "/images/:style/missing.png"
validates_attachment_content_type :image, content_type: /image\/.*\z/
```

When we run the generator for the Photos controller, rails has created automatically new route for us but it doesn't do what we need. Change with the code from the snippet below.

```ruby
# routes.rb

root to: "albums#index"
delete 'photo/:id' => 'photos#destroy', as: 'photo'
```

Next step will be to update the form partial for the Albums using simple form and rails's file_field_tag for the file attachments. We set the form to be multipart and the file_filed in order to select multiple files. All selected files will be wrapped in an array and passed to the params as a key images.

```erb
<!-- albums/_form.html.erb -->

<%= simple_form_for(album, html: {multipart: true}) do |f| %>

  <%= f.input :name %>

  <%= f.input "Choose photos" do %>
    <%= file_field_tag "images[]", type: :file, multiple: true %>
  <% end %>

  <%= f.button :submit %>
<% end %>
```

Update the albums_controller to get the array with the images from the params and add them to the given album.

```ruby
#albums_controller.rb

def create
  @album = Album.new(album_params)

  respond_to do |format|
    if @album.save

      #Add lines bellow
      if params[:images]
        params[:images].each { |image|
        @album.photos.create(image: image)
      }
    end

      format.html { redirect_to @album, notice: 'Album was successfully created.' }
      format.json { render :show, status: :created, location: @album }
    else
      format.html { render :new }
      format.json { render json: @album.errors, status: :unprocessable_entity }
    end
  end
end
```

It's time to fire up the server and see if what we've done so far is working. Go to new album and create one with a few photos. Everything works fine and we're redirected to the show page but only the album name is visible. Let's change that. Add the following div just above the links at the bottom. Refresh and hurray, we've got our photos!

```erb
<!-- albums/show.html.erb -->

<div>
  <% @album.photos.each do |photo| %>
        <%= link_to image_tag(photo.image.url(:medium)), photo.image.url, data: { gallery: ''} %>
        <% end %>
</div>
```

Next thing I want to change is when I create a new album and select files, instead seeing just the number of files selected I want to have some visual representation. Place a holder in the form.

```erb
<!-- albums/_form.html.erb -->

<%= f.input :name %>

<div id="image-preview"></div> <!-- Add this line -->

<%= f.input "Choose photos" do %>
```

And add the required javascript.

```js
// application.js

var ready;
ready = function () {
  // Photo preview on album create
  var preview = $('#image-preview');
  $('#images_').change(function (event) {
    var input = $(event.currentTarget);
    var files = input[0].files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var reader = new FileReader();
      reader.onload = function (e) {
        image_base64 = e.target.result;
        var html = '<img src=' + image_base64 + " style='max-width: 200px;'>";
        preview.append(html);
      };
      reader.readAsDataURL(file);
    }
  });
  // Clear images when Browse is clicked again
  $('#images_').click(function () {
    $('#image-preview img').remove();
  });
};

$(document).on('turbolinks:load', ready);
```

I have two functions. One is to show the selected files. The other one is to clear them from the screen in case the user decides to change his selection.

Another change to the form will be to display all album photos when we update existing album and provide a button in case the user wants to delete photo or photos from the collection.

```erb
<!-- _form.html.erb -->

<%= f.input :name %>

<% if @album.photos.any? %>
  <div id="images">
    <% @album.photos.each do |photo| %>
      <div id="photo-<%= photo.id %>" class="image">
         <%= link_to photo, method: :delete,
                          data: { confirm: 'Are you sure?' },
                          class: "delete-image",
                          remote: true,
                          title: "Delete Image" do %>
            <i class="glyphicon glyphicon-remove-circle"></i>
          <% end %>
        <%= image_tag photo.image.url(:medium) %>
      </div>
    <% end %>
  </div>
<% end %>

<!--
Add before this div
<div id="image-preview"></div>
-->
```

To position all buttons add styling as follows:

```css
/* application.scss */

.image {
  display: inline-block;
  position: relative;
}

.delete-image {
  position: absolute;
  top: 5px;
  right: 5px;
  color: red;
}
```

It's time to add some code to our photos controller.

```ruby
# photos_controller.rb

def destroy
  photo = Photo.find(params[:id])
  @id = photo.id
  photo.destroy
  respond_to :js
end
```

Create a new file views/photos/destroy.js.erb and add this code. This will look for a div with the id of the photo being deleted and will remove it from the screen.

```js
// destroy.js.erb

$('#photo-<%= @id %>').fadeOut();
```

Now, let's update our albums controller in case our user wants to add some photos insead of removing. Again we'll get all the photos being uploaded from the params[:images], but this time insted of blindly creating photos we have to check for duplicates first.

```ruby
# albums_controller.rb

def update
  respond_to do |format|
    if @album.update(album_params)

     if params[:images]
        params[:images].each do |image|
          existing_image = @album.photos.find {|photo| photo.image_file_name ==
                                                                                            image.original_filename}
          @album.photos.create(image: image) unless existing_image
      end
    end

      format.html { redirect_to @album, notice: 'Album was successfully updated.' }
      format.json { render :show, status: :ok, location: @album }
    else
      format.html { render :edit }
      format.json { render json: @album.errors, status: :unprocessable_entity }
    end
  end
end
```

Our form is working now for new albums and editing existing. It's time to beautify the way images are displayed on the show page. I'll use blueimp's gallery. Go to https://github.com/blueimp/Gallery and download blueimp-gallery.css and blueimp-gallery-indicator.css in your stylesheets directory. Include those in your application.scss.

```css
/* application.scss */

@import 'blueimp-gallery';
@import 'blueimp-gallery-indicator';
```

Then download blueimp-gallery.js to your javascripts directory and include it in your application.js.

```js
// application.js

// After turbolinks add
//= require blueimp-gallery
```

Open blueimp-gallery.css and update all urls for loading.gif, error.png, play-pause.png, error.svg and play-pause.svg. A valid url for image in rails looks like this:

```css
background: url('loading.gif');
```

Also download all the images from blueimp/Gallery/img in your app/assets/images folder.

Now all we have to do is add snippet of code and our gallery will spring to life. Wrap our code from before in a div tag with an id "links" and add the code snippet for the modal at the bottom of the page. It is IMPORTANT to place this snippet as direct descendant of the body. If your yield in the application is wrapped in a div or another tag, place the snippet on application.html.erb directly in the body. You can also import it as a partial.

```erb
<!-- show.html.erb -->

<div class="container">
  <div id="links">
    <% @album.photos.each do |photo| %>
        <%= link_to image_tag(photo.image.url(:medium)), photo.image.url, data: { gallery: ''} %>
        <% end %>
  </div>
</div>

<!-- The Gallery as lightbox dialog, should be a child element of the document body -->
<div id="blueimp-gallery" class="blueimp-gallery blueimp-gallery-controls">
    <div class="slides"></div>
    <h3 class="title"></h3>
    <a class="prev">‹</a>
    <a class="next">›</a>
    <a class="close">×</a>
    <a class="play-pause"></a>
    <ol class="indicator"></ol>
</div>
```

Add the onclick handler for the images, right after the second function handling the Browse click.

```js
// Clear images when Browse is clicked again
//  $("#images_").click(function(){
//    $("#image-preview img").remove();
//  });

//After above function

// Blueimp Light Box
document.getElementById('links').onclick = function (event) {
  event = event || window.event;
  var target = event.target || event.srcElement,
    link = target.src ? target.parentNode : target,
    options = { index: link, event: event },
    links = this.getElementsByTagName('a');
  blueimp.Gallery(links, options);
};
```

Our gallery is ready and looks great :) Unfortunately I can't say the same for the rest of the pages. I won't go crazy but I would like to add some basic styling for our pages. I'll start with the application.html.erb and move our notices from index and show in there along with some bootstrap styling.

```erb
<!-- application.html.erb -->

<!-- Add after body and before yield -->
<% if notice %>
  <div id="notice" class="alert alert-info alert-dismissible" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <%= notice %>
  </div>
<% end %>
```

Add bootstrap-sprockets after jquery in order for our dismiss button to work.

```js
// application.js

// after require jquery
//= require bootstrap-sprockets
```

```css
/* application.scss */

#notice {
  width: 50%;
  text-align: center;
  margin: 10px auto;
}
```

```erb
<!-- index.html.erb -->

<!-- Remove <p id="notice"><%= notice %></p> -->
```

```erb
<!-- show.html.erb

 Remove <p id="notice"><%= notice %></p>
-->
```

In application.html.erb I'll add header.

```erb

<!-- application.html.erb -->

<section>
  <div class="container">
      <h1 class="text-right"><%= link_to "Gallery", root_url %></h1>
  </div>
</section>
```

Some styling for our index page with out of the box bootstrap.

```erb
<!-- index.html.erb -->

<h2 class="text-center"><%= link_to 'New Album', new_album_path %></h2>

<div class="container">
  <div class="row">
    <% @albums.each do |album| %>
      <div class="col-sm-6 col-md-4">
        <div class="thumbnail">
          <% if album.photos.any? %>
            <%= link_to image_tag(album.photos.first.image.url(:medium)), album %>
          <% end %>
          <div class="caption">
            <h3 class="text-center"><%= album.name %></h3>
            <p><%= album.description %></p>
            <p>
              <%= link_to "Edit", edit_album_path(album), class: "btn btn-warning" %>
              <%= link_to "Delete", album, class: "btn btn-danger pull-right",
                                           method: :delete,
                                           data: { confirm: 'Are you sure?' } %>
             </p>
          </div>
        </div>
      </div>
    <% end %>
  </div>
</div>
```

In show.html remove the rails generated links.

```erb
<!-- show.html.erb -->

remove <%= link_to 'Edit', edit_album_path(@album) %> |
 <%= link_to 'Back', albums_path %>
```

Place new and edit pages in container.

```erb
<!-- new.html.erb -->

<h1 class="text-center">New Album</h1>

<div class="container">
  <%= render 'form', album: @album %>
</div>
```

```erb
<!-- edit.html.erb -->

<h1 class="text-center">Editing Album</h1>

<div class="container">
  <%= render 'form', album: @album %>
</div>
```

And the final styling.

```css
/* appclication.scss */

/* Styling for the header section */
@import url('https://fonts.googleapis.com/css?family=Sansita+One');


section{
  height: 100px;
  background-color:   #154890;
  a, a:hover{
    font-family: 'Sansita One', cursive;
    color:  #F5EDE3;
    font-size: 50px;
    font-weight: 700;
    text-decoration: none;
  }
}

/* Styling for the Edit page */

.image{
  ..
  ..
  height: 200px;
}

form{
  label{
    display: block;
  }
  div{
    margin-top: 15px;
    margin-bottom: 15px;
  }
  img{
    margin: 5px;
  }
  #album_name{
    width: 50%;
  }
}

/* Styling for the index, show and edit pages */

h2{
  margin: 30px auto;
}
```

That's it. Our gallery project is done. I'll throw a few screenshots for those of you who didn't do it.

<img src="http://s3.amazonaws.com/my-personal-page-static-content/app/public/ckeditor_assets/pictures/13/content_index.png" />
<img src="http://s3.amazonaws.com/my-personal-page-static-content/app/public/ckeditor_assets/pictures/12/content_new.png" />
<img src="http://s3.amazonaws.com/my-personal-page-static-content/app/public/ckeditor_assets/pictures/9/content_edit.png" />
<img src="http://s3.amazonaws.com/my-personal-page-static-content/app/public/ckeditor_assets/pictures/16/content_show.png" />
