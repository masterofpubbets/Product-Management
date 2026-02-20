CREATE OR REPLACE PROCEDURE pm.add_key_status(
	pid INT,
	"name" VARCHAR(255),
	"point" INT,
	"order" INT
)
AS $$
BEGIN
	INSERT INTO pm.key_status (status_name, points, status_order, pro_id)
	VALUES ("name", "point", "order", pid);
END;

$$ LANGUAGE plpgsql;

---------------------------------------------------------

CREATE OR REPLACE PROCEDURE pm.edit_key_status(
	"id" INT,
	"name" VARCHAR(255),
	"point" INT,
	"order" INT
)
AS $$
BEGIN
	UPDATE pm.key_status
		SET status_name = "name",
			points = "point",
			status_order = "order"
	WHERE kpi_id = "id";
END;

$$ LANGUAGE plpgsql;

---------------------------------------------------------


CREATE OR REPLACE FUNCTION pm.key_status_exists(
	pid INT,
	"name" VARCHAR(255)
)
RETURNS VARCHAR(50)
AS $$
DECLARE
	"id" INT;
BEGIN
	SELECT kpi_id INTO "id" FROM pm.key_status WHERE status_name = "name" AND pro_id = pid;
	IF "id" IS NULL THEN
		RETURN 'not exists';
	ELSE
		RETURN 'exists';
	END IF;
END;

$$ LANGUAGE plpgsql;

---------------------------------------------------------


CREATE OR REPLACE FUNCTION pm.key_status_exists2(
	keyid INT,
	"name" VARCHAR(255)
)
RETURNS VARCHAR(50)
AS $$
DECLARE
	"id" INT;
BEGIN
	SELECT kpi_id INTO "id" FROM pm.key_status WHERE status_name = "name" AND kpi_id <> keyid;
	IF "id" IS NULL THEN
		RETURN 'not exists';
	ELSE
		RETURN 'exists';
	END IF;
END;

$$ LANGUAGE plpgsql;

---------------------------------------------------------

CREATE OR REPLACE PROCEDURE pm.del_key_status(
	"id" INT
)
AS $$
BEGIN
	DELETE FROM pm.key_status
	WHERE kpi_id = "id";
END;

$$ LANGUAGE plpgsql;

---------------------------------------------------------
DROP FUNCTION pm.key_status_exists3;
CREATE OR REPLACE FUNCTION pm.key_status_exists3(
	stid INT
)
RETURNS VARCHAR(50)
AS $$
DECLARE
	"id" INT;
BEGIN
	SELECT key_id INTO "id" FROM pm.key_results WHERE kpi_id = stid;
	IF "id" IS NULL THEN
		RETURN 'not exists';
	ELSE
		RETURN 'exists';
	END IF;
END;

$$ LANGUAGE plpgsql;

---------------------------------------------------------

CREATE OR REPLACE PROCEDURE pm.add_okr(
	pid INT,
	des TEXT,
	o_group VARCHAR(255),
	o_order INT
)
AS $$
BEGIN
	INSERT INTO pm.objectives (pro_id, obj_des, obj_group, obj_order)
	VALUES (pid, des, o_group, o_order);
END;

$$ LANGUAGE plpgsql;

---------------------------------------------------------

CREATE OR REPLACE FUNCTION pm.check_obj(
	pid INT,
	des TEXT
)
RETURNS VARCHAR(50)
AS $$
DECLARE 
	"id" INT;
BEGIN
	SELECT obj_id INTO "id" FROM pm.objectives WHERE pro_id = pid AND obj_des = des;
	IF "id" IS NULL THEN
		RETURN 'not exists';
	ELSE
		RETURN 'exists';
	END IF;
END;

$$ LANGUAGE plpgsql;

---------------------------------------------------------
CREATE OR REPLACE PROCEDURE pm.check_obj2(
	objid INT,
	des TEXT
)

AS $$
DECLA
BEGIN
	UPDATE pm.objectives 
		SET obj_des = des,
			obj_group = "group",
			obj_order = "order"
	WHERE obj_id = objid;
END;

$$ LANGUAGE plpgsql;

---------------------------------------------------------

CREATE OR REPLACE PROCEDURE pm.add_key_result(
	proid INT,
	objid INT,
	"name" TEXT,
	w INT,
	kpi VARCHAR(255)
)

AS $$
DECLARE
	kpiid INT;
BEGIN
	SELECT kpi_id INTO "kpiid" FROM pm.key_status WHERE status_name = kpi AND pro_id = proid;
	INSERT INTO pm.key_results (obj_id, results, weight, kpi_id)
	VALUES (objid, "name", w, kpiid);
END;

$$ LANGUAGE plpgsql;

---------------------------------------------------------

CREATE OR REPLACE FUNCTION pm.check_key_result(
	proid INT,
	"name" TEXT
)
RETURNS VARCHAR(50)
AS $$
DECLARE
	"id" INT;
BEGIN
	SELECT key_id INTO "id" FROM pm.key_results 
	INNER JOIN pm.objectives ON pm.key_results.obj_id = pm.objectives.obj_id
	WHERE pm.objectives.pro_id = proid AND pm.key_results.results = "name";
	IF "id" IS NULL THEN
		RETURN 'not exists';
	ELSE
		RETURN 'exists';
	END IF;
END;

$$ LANGUAGE plpgsql;




	



