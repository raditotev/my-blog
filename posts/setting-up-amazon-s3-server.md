---
title: Setting Up Amazon S3 Server
date: 2016-07-03
description: If you are setting up Amazon AWS S3 server for your static files, this article might help you answer some questions and ease the process.
categories:
  - aws
  - s3
---

If this is the first time you're about to use Amazon Web Services you might find it a bit confusing to say the least. It took me a few hours going through the documentation and number of related posts to finally get it done. Hopefully this will help and save you some time.

First you have to create an AWS account. If you have an existing Amazon account you can use it for AWS. Once you're logged in, in the upper corner there is a 'My account' drop down menu and inside of it click on 'AWS Management Console'.

[![AWS console](http://s3.amazonaws.com/my-personal-page-static-content/app/public/ckeditor_assets/pictures/4/content_aws-myaccount.png#center)](https://blog-radi.s3.amazonaws.com/setting-up-amazon-s3-server/content_aws-myaccount.png)

Inside the Console click on 'Identity and Access Management' aka IAM in order to create a user. From the Dashboard on the left choose Users and click on 'Create New Users' button on the top of the page.

[![AWS console](http://s3.amazonaws.com/my-personal-page-static-content/app/public/ckeditor_assets/pictures/5/content_aws-create-users.png#center)](https://blog-radi.s3.amazonaws.com/setting-up-amazon-s3-server/content_aws-create-users.png)

Fill in the first box with the user name of your choice and click 'Create'. Next screen confirms that a new user has been created and there is a link "Show User Security Credentials". Click on the link and save the information in a text file. You'll need these details for setting up the server where your app lives.

[![AWS console](http://s3.amazonaws.com/my-personal-page-static-content/app/public/ckeditor_assets/pictures/6/content_aws-new-user.png#center)](https://blog-radi.s3.amazonaws.com/setting-up-amazon-s3-server/content_aws-new-user.png)

Close this window and on the next page click on the user you've just created. You'll be redirected to the user's page. Click on the 'Permissions' tag. Click on the 'Attach Policy' button. Tick the box for **AmazonS3FullAccess** and click on 'Attach Policy Button'.

[![AWS console](http://s3.amazonaws.com/my-personal-page-static-content/app/public/ckeditor_assets/pictures/7/content_aws-policy.png#center)](https://blog-radi.s3.amazonaws.com/setting-up-amazon-s3-server/content_aws-policy.png)

Now your user is set up and ready to manipulate content in the S3 storage.

Next step is to create a Bucket and set permissions so our user can access it. Click on the 'Services' drop down in the upper left corner and select 'S3'. On the next page click on 'Create Bucket'. Choose a name for the Bucket and a region. Choose a region in the same geographical location where you app server is in order to take advantage of AWS's free in region [data transfer rates](http://aws.amazon.com/s3/pricing/). When ready click 'Create'. On the next page click on 'Properties' in the upper right corner and then 'Permissions'. From 'Permissions' click on 'Add bucket policy'. In the pop up window click on the link 'AWS Policy Generator' in the bottom left corner. Choose 'S3 bucket Policy' from **Select Type of Policy**. Leave **Effect** as it is. In **Principal** enter your user ARN. This can be found in IAM (''Identity and Access Management') > Users > your_user_name 'Summary' page.

[![AWS console](http://s3.amazonaws.com/my-personal-page-static-content/app/public/ckeditor_assets/pictures/8/content_aws-user-arn.png#center)](https://blog-radi.s3.amazonaws.com/setting-up-amazon-s3-server/content_aws-user-arn.png)

Under **Actions** choose what actions the user will be allowed to do with the objects inside the bucket. If you want to allow Read/Write choose 'GetObject' and 'PutObject'. In **Amazon Resource Name ARN** place your bucket's ARN NOT your user's. Bucket's ARN is in the following format: arn:aws:s3:::<your_bucket_name>/\*. Click on 'Add Statement'. If everything is set properly 'Generate Policy' will appear. Click and copy the code from the pop up window and paste it in the first pop up window. The one that opened when you clicked on 'Add Bucket Policy'.

We are almost ready. Now we only have to **Add CORS Configuration**. This is in your Bucket > Permission section. After you click, there will be another pop up window.. Click on the 'Sample CORS Configurations'. Copy the first example and paste it in the pop up window.

```bash
<CORSConfiguration>
  <CORSRule>
    <AllowedOrigin>http://www.example1.com</AllowedOrigin>

    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>DELETE</AllowedMethod>

    <AllowedHeader>*</AllowedHeader>
  </CORSRule>
</CORSConfiguration>
```

In AllowedOrigin place the URL from where your app server will access this bucket. In AllowedMethod choose what requests will be permitted. Click on 'Save' and you're ready.
