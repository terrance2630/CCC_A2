#!/bin/bash

# run the MRC file
. ./grp-20-openrc.sh

# make sure ansible is installed
sudo pip install ansible

# run the ansible playbook
ansible-playbook -i inventory/hosts.ini -u ubuntu --key-file=config/group_20.pem one-click-auto-deploy.yaml

