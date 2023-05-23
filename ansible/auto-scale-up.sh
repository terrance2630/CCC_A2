#!/bin/bash

# ANSI escape code colours
RED='\033[0;31m'
NC='\033[0m'

# Check the arguments supplied
if [ "$1" == "--new-ip" ] && [ -n "$2" ]; then
    # add the new IP address to inventory
    echo $2 >> inventory/hosts.ini
    # run the ansible playbook
    ansible-playbook -i inventory/hosts.ini -u ubuntu --key-file=config/group_20.pem auto-scale-up.yaml
elif [ "$1" == "--exist-ip" ]; then
    # run the ansible playbook
    ansible-playbook -i inventory/hosts.ini -u ubuntu --key-file=config/group_20.pem auto-scale-up.yaml
else
    echo -e "${RED}ERROR: Invalid argument supplied!${NC}"
    echo -e "Usage: ./auto-scale-up.sh --new-ip <IP address>"
    echo -e "Or: ./auto-scale-up.sh --exist-ip\n"
fi
