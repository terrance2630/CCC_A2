# Usage Guide for Ansible Automation


### Prerequisites

1. Log in to your MRC dashboard and download the `openrc.sh` file
2. Reset and copy the password for your MRC account, this will be used for the `openrc.sh` script
3. Put your `openrc.sh` file in the `/ansible/openrc/` directory
4. Make sure the private key `group_20.pem` for logging into the instances is placed in the `/ansible/config/` directory
5. Run the below command


### Auto Deployments with Ansible

> Run the following command to deploy the webapp, database and Mastodon harvester:

```bash
chmod +x one-click-auto-deploy.sh
./one-click-auto-deploy.sh
```

### Auto Scale up Mastodon Harvester
*Please make sure you run the above auto deployment script first before running this script*  

> Run the following command to auto scale up the Mastodon harvester to a new instance on MRC:  

```bash
chmod +x auto-scale-up.sh
./auto-scale-up.sh
```
See the below image for a usage example:
![](../resource/auto-scale-use.png)

*To auto scale down the Mastodon client, simply replace the command with file name `auto-scale-down.sh`*