#!/bin/bash

# Run the openrc file
chmod +x openrc/grp-20-openrc.sh
. ./openrc/grp-20-openrc.sh

# make sure ansible is installed
sudo pip install ansible

# change the permission of the private key
chmod 600 config/group_20.pem

# run the ansible playbook
ansible-playbook -i inventory/hosts.ini -u ubuntu --key-file=config/group_20.pem one-click-auto-deploy.yaml

