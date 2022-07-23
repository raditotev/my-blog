---
title: Automate the Start and End of Your Work Day
date: 2022-07-23
description: This article is for those who own a Mac and use their machine for work and in private. If there are a bunch of applications you launch at the start of every day and stop by the end keep on reading.
categories:
  - macos
---

Following the instructions in this article help reduce the time you spend in preparation each morning and also will help you more abruptly end your working day.

If you are like me and use your machine for work and private stuff you probably start your day opening a bunch of applications and then by the end of the day also closing them. In the process you might forget to start an application - for example one that is important to me is clockify (used for tracking time spent on a project) or you might get carried away when closing them, e.g. checking your mail before the end of the day and start acting on an incoming e-mail.

Luckily for us MacOs come with an application called automator. To create a new automation open the app and select **File > New** or **⌘ N**.

![Create new automator](https://blog-radi.s3.amazonaws.com/automate-the-start-and-end-of-your-work-day/automator_screenshot_1.png#center)

From the next screen select **Application** and then search for **launch** in actions. You will see the action **Launch Application** in the pane below. Double click it or drag and drop it in the pane on the right and you'll be able to select an application.

![Set automator](https://blog-radi.s3.amazonaws.com/automate-the-start-and-end-of-your-work-day/automator_screenshot_2.png#center)

Repeat the previous steps until you have all the applications you launch every morning. My list looks like this:

![My start workday automator](https://blog-radi.s3.amazonaws.com/automate-the-start-and-end-of-your-work-day/automator_screenshot_3.png#center)

When you finish give your automator a name and save it either by selecting **File > Save** or by using **⌘ S**. You can test it from the automator set up screen by pressing the **Run** button or by calling it using the spotlight search **⌘ Space**.

Using the same set of steps but instead of **Launch Application** use **Quit Application** to create another automator to use at the end of the working day. As a reference this is what mine looks like.

![My end workday automator](https://blog-radi.s3.amazonaws.com/automate-the-start-and-end-of-your-work-day/automator_screenshot_4.png#center)
