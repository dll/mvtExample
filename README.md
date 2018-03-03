# About
Tiny project to learn something about the usage of Mapbox Vector Tiles with openlayers 3

# Preparation
* install at least Postgres 9.6  with postgis extension
* create a database with a table "geoms" 
* geoms table has a column geom which is the geometry column
* add random geometries with srid 4326
* unused Port 8181 - or change package.json the way you want it

``` sql
psql postgres
> create database geodb;
> \c geodb;
> create extension postgis;
> create table geoms ( id serial primary key, geom geometry);
>\q
```

# Installation
```
npm install
```

# Start
```
npm run start
```
