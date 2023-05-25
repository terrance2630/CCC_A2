# CCC_A2 Repository User Guide

## Team Member

| Name | Student ID | GitHub Profile |
| ---- | ---- | -------------- |
| Bowen Fan | 1035162 | [@Bowen](https://github.com/bowenfan-unimelb) |
| Guanqin Wang | 1074138 | [@Harry](https://github.com/Harry-Guanqin-Wang) |
| Junran Lin | 1068324 | [@Anson](https://github.com/junranLin) |
| Tianqi Wang | 1045939 | [@Terrance](https://github.com/terrance2630) |
| Yi (Eunice) Yao | 1288896 | [@Eunice](https://github.com/Eunice55) |
> :blush: P.S. We are all base in Melbourne :city_sunrise::city_sunrise:


## Ansible Automation

> :exclamation: Make sure the prerequisites are met before running the following steps.
> 
### Prerequisites

1. Log in to your MRC dashboard and download the `openrc.sh` file
2. Reset and copy the password for your MRC account, this will be used for the `openrc.sh` script
3. Put your `openrc.sh` file in the `/ansible/openrc/` directory
4. Make sure the private key `group_20.pem` for logging into the instances is placed in the `/ansible/config/` directory
5. Run the below command


### Auto Deployments with Ansible

> :computer: Run the following command to deploy the webapp, database and Mastodon harvester:

```bash
chmod +x one-click-auto-deploy.sh
./one-click-auto-deploy.sh
```

### Auto Scale up Mastodon Harvester
*Please make sure you run the above auto deployment script first before running this script*  

> :computer: Run the following command to auto scale up the Mastodon harvester to a new instance on MRC:  

```bash
chmod +x auto-scale-up.sh
./auto-scale-up.sh
```
See the below image for a usage example:
![](../resource/auto-scale-use.png)

*To auto scale down the Mastodon client, simply replace the command with file name `auto-scale-down.sh`*

## Web Application Environment Setup  

> :exclamation::computer: The following instructions only works on a Unix like operating system.

After `git clone` the repository, `cd` to the project root folder.   

Run the command 
``` shell
chmod +x init_env.sh
``` 
This will make the script executable. Then execute the following command to install all the required packages and setup the environment for both frontend and backend.  
``` shell
./init_env.sh
```
_(All the required packages is likely to be added to `package.json` alrady. Lookup or request before adding new packages.)_

> Note: The web application use `pnpm` as package manager, for cloud infrastructure setup, please refer to [this]() for installation.  
> 
> p.s. link to be filled. we may need to discuss how to setup the env on cloud with Ansible :O 
