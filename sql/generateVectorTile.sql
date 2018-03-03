with geom as (
	select geom as geom from geoms where id = 1
), bottomleft as (
	select st_setsrid(st_point(st_xmin(geom), st_ymin(geom)), 4326) as geom
	from geom
), topright as (
	select st_setsrid(st_point(st_xmax(geom), st_ymax(geom)), 4326) as geom
	from geom
), boundingbox as (
	select st_makebox2d((select geom from bottomleft), (select geom from topright)) as bbox
)

--select st_asmvt(x)
--from (
--	select st_asmvtgeom((select geom from geom), bbox, 4096, 0, false)
--	from boundingbox
--)x;


	select st_astext(st_asmvtgeom((select geom from geom), bbox, 4096, 0, false))
	from boundingbox
