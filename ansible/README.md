# Usage Guide for Ansible Automation

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