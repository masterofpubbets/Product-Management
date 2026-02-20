WITH ObjInfo AS (
	SELECT
		pm.initiatives.ini_id, pm.initiatives.status,
		pm.key_results.key_id, pm.key_results.weight,
		pm.objectives.obj_id, pm.objectives.obj_progress, pm.objectives.pro_id,
		pm.ini_status.st_name, pm.ini_status.st_rank,
		COUNT(pm.initiatives.ini_id) OVER (PARTITION BY pm.objectives.obj_id) AS IniCountPerObj,
		COUNT(pm.initiatives.ini_id) OVER (PARTITION BY pm.key_results.key_id) AS IniCountPerKey,
		ROUND((pm.key_results.weight / (COUNT(pm.initiatives.ini_id) OVER (PARTITION BY pm.key_results.key_id))), 2) AS IniKeyWeight,
		pm.ini_status.st_rank * pm.key_results.weight / (COUNT(pm.initiatives.ini_id) OVER (PARTITION BY pm.key_results.key_id)) AS ObjProgress
		
		
	FROM pm.initiatives
	INNER JOIN pm.key_results ON pm.initiatives.key_id = pm.key_results.key_id
	INNER JOIN pm.objectives ON pm.key_results.obj_id = pm.objectives.obj_id
	INNER JOIN pm.ini_status ON pm.initiatives.status = pm.ini_status.st_name
	WHERE pm.objectives.pro_id = 38
)

SELECT 
obj_id AS "id", 'Obj' AS "type",
ROUND(SUM(ObjProgress), 2) AS progress,
IniCountPerObj AS ini_count
FROM ObjInfo
GROUP BY obj_id, IniCountPerObj

UNION ALL


SELECT 
key_id AS "id", 'key' AS "type",
ROUND(ROUND(SUM(ObjProgress), 2) * 100 / weight, 2)  AS progress,
IniCountPerKey AS ini_count
FROM ObjInfo
GROUP BY key_id, weight, IniCountPerKey

UNION ALL

SELECT 
ini_id AS "id", 'ini' AS "type",
ROUND(st_rank * 100, 2)  AS progress,
1 AS ini_count
FROM ObjInfo



