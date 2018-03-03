with geoms as (
	select geom 
	from geoms g
), bottomLeft as (
	select st_setsrid(st_point(0, 85.05), 4326) as geom
), topRight as (
	select st_setsrid(st_point(180, 0), 4326) as geom
), bbox as (
	select st_makebox2d((select geom from bottomLeft), (select geom from topRight)) as bbox
)

select st_asmvt(x) 
from (
	select st_asmvtgeom(geom, (select bbox from bbox), 4096, 0, false) as mvtGeom
	from geoms
)x;