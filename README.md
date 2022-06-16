# Biodiversity map

## To run this project:

You will need nodejs (currently built against v14.19.1) and docker.

## How to install nodejs and npm?

### Step 1: Download Node.js Installer
In a web browser, navigate to https://nodejs.org/en/download/. Click the Windows Installer button to download the latest default version. The Node.js installer includes the NPM package manager.

### Step 2: Install Node.js and NPM from Browser
1. Once the installer finishes downloading, launch it. Open the downloads link in your browser and click the file. Or, browse to the location where you have saved the file and double-click it to launch.

2. The system will ask if you want to run the software – click Run.

3. You will be welcomed to the Node.js Setup Wizard – click Next.

4. On the next screen, review the license agreement. Click Next if you agree to the terms and install the software.

5. The installer will prompt you for the installation location. Leave the default location, unless you have a specific need to install it somewhere else – then click Next.

6. The wizard will let you select components to include or remove from the installation. Again, unless you have a specific need, accept the defaults by clicking Next.

7. Finally, click the Install button to run the installer. When it finishes, click Finish.

### Step 3: Verify Installation
Open a command prompt (or PowerShell), and enter the following:

$ node -v

The system should display the Node.js version installed on your system. You can do the same for NPM:

$ npm -v

## How to install Docker ?

### System requirements

Your Windows machine must meet the following requirements to successfully install Docker Desktop.

**WSL 2 backend**

- Windows 11 64-bit: Home or Pro version 21H2 or higher, or Enterprise or Education version 21H2 or higher.
- Windows 10 64-bit: Home or Pro 21H1 (build 19043) or higher, or Enterprise or Education 20H2 (build 19042) or higher.
- Enable the WSL 2 feature on Windows. For detailed instructions, refer to the Microsoft documentation.
- The following hardware prerequisites are required to successfully run WSL 2 on Windows 10 or Windows 11:

  - 64-bit processor with Second Level Address Translation (SLAT)
  - 4GB system RAM
  - BIOS-level hardware virtualization support must be enabled in the BIOS settings. For more information, see Virtualization.
- Download and install the Linux kernel update package. (https://docs.microsoft.com/fr-fr/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package)

**Hyper-V backend and Windows containers**
- Windows 11 64-bit: Pro version 21H2 or higher, or Enterprise or Education version 21H2 or higher.
- Windows 10 64-bit: Pro 21H1 (build 19043) or higher, or Enterprise or Education 20H2 (build 19042) or higher. For Windows 10 and Windows 11 Home, see the system requirements in the WSL 2 backend tab.
- Hyper-V and Containers Windows features must be enabled.
- The following hardware prerequisites are required to successfully run Client Hyper-V on Windows 10:
  - 64 bit processor with Second Level Address Translation (SLAT)  
  - 4GB system RAM 
  - BIOS-level hardware virtualization support must be enabled in the BIOS settings. For more information, see Virtualization.
### To install Docker
1. Double-click Docker Desktop Installer.exe (https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe) to run the installer.If you haven’t already downloaded the installer (Docker Desktop Installer.exe), you can get it from Docker Hub. It typically downloads to your Downloads folder, or you can run it from the recent downloads bar at the bottom of your web browser.

2. When prompted, ensure the Use WSL 2 instead of Hyper-V option on the Configuration page is selected or not depending on your choice of backend.If your system only supports one of the two options, you will not be able to select which backend to use.

3. Follow the instructions on the installation wizard to authorize the installer and proceed with the install.

4. When the installation is successful, click Close to complete the installation process.

5. If your admin account is different to your user account, you must add the user to the docker-users group. Run Computer Management as an administrator and navigate to Local Users and Groups > Groups > docker-users. Right-click to add the user to the group. Log out and log back in for the changes to take effect.

### Start Docker Desktop
Docker Desktop does not start automatically after installation. To start Docker Desktop:

1. Search for Docker, and select Docker Desktop in the search results.

2. The Docker menu (whale menu) displays the Docker Subscription Service Agreement window. It includes a change to the terms of use for Docker Desktop.

**Here’s a summary of the key changes:**

  - Our Docker Subscription Service Agreement includes a change to the terms of use for Docker Desktop
  - It remains free for small businesses (fewer than 250 employees AND less than $10 million in annual revenue), personal use, education, and non-commercial open source projects.
  - It requires a paid subscription for professional use in larger enterprises.
  - The effective date of these terms is August 31, 2021.
  - The existing Docker Free subscription has been renamed Docker Personal and we have introduced a Docker Business subscription .
  - The Docker Pro, Team, and Business subscriptions include commercial use of Docker Desktop.
3. Click the checkbox to indicate that you accept the updated terms and then click Accept to continue. Docker Desktop starts after you accept the terms.

## Launch the project:
- Open a command shell.
- Git clone the repo with this command) `git clone https://github.com/HugoBelotDeloro/biodiversity-map.git`
- Run this command `cd biodiversitymap`
- Run `npm install` to prepare node dependencies.
- Run `docker compose up` to start the Redis cache.
- Run `npm start` to start the dev server.
- Connect to http://localhost:3000/ to see the application on your browser.

This project uses *nodemon* to automatically restart the server when server files are changed, you will have to reload your browser manually when modifying front-end-related files.
