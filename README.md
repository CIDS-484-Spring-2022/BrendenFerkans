# BrendenFerkans

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




----------------------Current Progress---------------------
No actual code has been written. I currently am doing a crash course on React to build it in React. I also have not decided if I am going to build it all in React or in combination with other languages.
Currently only the outline above exists in software. However there is a physical system that is set up and is running using other software, and is currently accessible.
