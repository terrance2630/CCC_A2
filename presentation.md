---
marp: true
theme: gaia
# class: invert
math: mathcal

# self defined style for two columns
style: |
    .columns {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1rem;
    }
    .lead {
      text-align: center;
    }

---

# COMP90024 
# Cluster and Cloud Computing 
**Web Application and Scenarios Demo** :rocket:  

<span style="color: grey">By - </span>Team 42



--- 
# Introduction

- our topic
- we aim to ...
- the data ...
  - data source
  - mastodon, twitter ...
- web application for demonstration


--- 
# Architecture

- text go here

--- 
# Web Application

Make sure you are connecting the school network or UniMelb VPN.


**Live Demo**:
Visit [172.26.128.31](http://172.26.128.31:3000/) for live demo of the web application.


---
<!--_class: lead-->
# Scenario 1 - Food

--- 
### Findings
![bg left width:6in](frontend/src/logo.svg)

- From inspection, about 4.43% of tweets mentioned food, and 45.82% of them showed a positive sentiment.
- Higher proportion of positive sentiment towards food compared to the overall positive sentiment.


--- 
### Food Topic Modeling

- image go here
- Among all these tweets about food, we try to find what people usually discuss by LDA topic modeling, we group what people discuss into 5 topics, and extract the key words for each topic.


---
<!--_class: lead-->

**So, What might affect people’s attitude towards food?**

---

#### Locations
- Our analysis is based on location, that is the Statistical Area Level 4 (SA4), the map here divides Australia into 86 polygons, and each represents a SA4 area.
- However, 

![bg right width:6in](frontend/src/logo.svg)

--- 

#### Income

- We try to see if people’s attitudes towards food is also related to their income
- There is no significant correlation between the income and the number of tweets about food for each SA4 area.

![bg right width:6in](frontend/src/logo.svg)


---
<!--_class: lead-->
# Scenario 2 - Traffic
--- 



---
# Scenario 3 - Sport




---
# Mastodon

#### Server
- text






--- 
<!--_class: lead-->
## Thank you ! :heart:
