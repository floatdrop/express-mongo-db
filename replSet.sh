mkdir -p /tmp/mongodb/data/rs0
mkdir -p /tmp/mongodb/data/rs1
mkdir -p /tmp/mongodb/data/rs2
mkdir -p /tmp/mongodb/log
mongod -f test/config/rs0.conf --fork
mongod -f test/config/rs1.conf --fork
mongod -f test/config/rs2.conf --fork
