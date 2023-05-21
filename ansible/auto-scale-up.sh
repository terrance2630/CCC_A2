#!/bin/bash


# run the ansible playbook
ansible-playbook -i inventory/hosts.ini -u ubuntu --key-file=config/group_20.pem auto-scale-up.yaml