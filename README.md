# CCC_A2

### Web Application Environment Setup  

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