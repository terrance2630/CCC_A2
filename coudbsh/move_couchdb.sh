sudo snap stop couchdb
sudo mv /var/snap/couchdb/common /data/couchdb
sudo ln -s /data/couchdb /var/snap/couchdb/common
sudo snap connect couchdb:removable-media
sudo snap start couchdb