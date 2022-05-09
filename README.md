# BrendenFerkans

---------------------UPDATE Final Update------------------------------------

For this update, the project is almost completely finished. You can upload files to the server and in theory download them. I explain on the video why you cant quite download them yet. Well you can download 1 file. That essentially completes this project, and while there is alot of features to add and css to fix, that is minor things. The big thing is that the project is done and it works.


Where to go from here (although you probably wont see it):
Finish it to where you can download multiple files,
Add thumbnails/previews,
Hash and compare for accuracy on large transfers,
Restart download if error or failure occured,
Fix css,
Implement other mentioned but minor features.

Thank you for following this project and journey, not that you had a choice.



---------------------UPDATE MileStone 3------------------------------------

Posted in the milestone3 folder is the new code.
It is around the same amount of code as previously, although almost the entire thing has been rewritten.
The login and log out works perfectly as a system with session and other such things.
There currently is a bug where only the first user in the list can log in....but minor things....minor things.


Where to go from here: 

In the code is the start of the file transfering system. So far only the barebones code for the behind the scenes is there. I plan to get a basic version of it up and running before making it all fancy with previews and error checking and hashing along with server/folder selecting.





---------------------UPDATE MileStone 2------------------------------------

Posted in the files is current progress on the code.
It is alot more than no code previously, however still is not working to the point i wanted it too
I wanted to get the login done meaning session creation and termination however it currently only has the funcionality to check if a user is stored, however does not acutally create a session.










-------------------------OVERVIEW--------------------------------

GUI and service manager for a NAS

This project is going to be a GUI and service manager for a cloud/NAS hardware project my brother and I are working on. The goal of this software is to create a friendly interface for non-techie people to use the cloud we are building. It should also handle or manage another software that will sync up a distributed system of drives.



---------------------------What it should do--------------------------------------

--Simple--


•	GUI for FTP server

o	Make a user-friendly interface for users to upload content to a distributed file system.


--Connections--

•	Client software should establish a connection to server

•	Software should ftp requested file from client to server

o	Software needs to be reliable and deal with interrupted connection

o	Software needs to deal with pauses



--FTP--

•	Software should be able to retrieve files from serve and ftp them to client

•	Software should present a thumbnail picture while viewing files on server

o	Like windows file explorer

o	Essentially this will be windows file explorer with ftp to and from a server

o	(software may have to run as service?) depends on usage



--How should the software handle users--

o	Users should enter password to connect to server

o	Registration will be handled single case by admin

o	Software will generate a keypair for authentication

	Admin will have to register them on server

•	Software will email to alert us of new user?

•	On exit it will log out/terminate session



--Future additions--

•	(Optional/Future addition) Add distributed system

o	Users would connect to their local server and ftp to/from it and server would then sync with other servers over low usage time i.e. nighttime.

	Possibly with Redis or custom.

--Future use--

o	Auto push changes to cloud




----------------------Beginning Progress---------------------

No actual code has been written. I currently am doing a crash course on React to build it in React. I also have not decided if I am going to build it all in React or in combination with other languages.
Currently only the outline above exists in software. However there is a physical system that is set up and is running using other software, and is currently accessible.
