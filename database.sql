-- Drop table

-- DROP TABLE public.authentication_types;

CREATE TABLE public.authentication_types (
	id serial NOT NULL,
	auth_provider varchar NOT NULL,
	CONSTRAINT authentication_types_pk PRIMARY KEY (id)
);

-- Drop table

-- DROP TABLE public.planner;

CREATE TABLE public.planner (
	id serial NOT NULL,
	"userId" int4 NOT NULL,
	CONSTRAINT planner_pk PRIMARY KEY (id),
	CONSTRAINT planner_un UNIQUE ("userId")
);

-- Drop table

-- DROP TABLE public.planner_detail;

CREATE TABLE public.planner_detail (
	"plannerId" int4 NOT NULL,
	"tutorialId" int4 NOT NULL,
	"startedAt" timestamptz NULL,
	"completedAt" timestamptz NULL,
	CONSTRAINT planner_detail_pk PRIMARY KEY ("plannerId", "tutorialId"),
	CONSTRAINT planner_detail_fk FOREIGN KEY ("plannerId") REFERENCES planner(id) ON DELETE CASCADE,
	CONSTRAINT planner_detail_fk_1 FOREIGN KEY ("tutorialId") REFERENCES tutorials(id)
);

-- Drop table

-- DROP TABLE public.tags;

CREATE TABLE public.tags (
	id serial NOT NULL,
	tag varchar NOT NULL,
	CONSTRAINT tags_pk PRIMARY KEY (tag)
);

-- Drop table

-- DROP TABLE public.tutorial_sections;

CREATE TABLE public.tutorial_sections (
	id serial NOT NULL,
	"tutorialId" int4 NOT NULL,
	title varchar NULL,
	"content" varchar NULL,
	"isDeleted" bool NOT NULL DEFAULT false,
	CONSTRAINT tutorial_sections_pk PRIMARY KEY (id),
	CONSTRAINT tutorial_sections_fk FOREIGN KEY ("tutorialId") REFERENCES tutorials(id)
);

-- Drop table

-- DROP TABLE public.tutorial_sections_progress;

CREATE TABLE public.tutorial_sections_progress (
	id serial NOT NULL,
	"sectionId" serial NOT NULL,
	"userId" int4 NOT NULL,
	"isComplete" bool NOT NULL DEFAULT false,
	CONSTRAINT tutorial_sections_progress_pk PRIMARY KEY ("sectionId", "userId"),
	CONSTRAINT tutorial_sections_progress_fk FOREIGN KEY ("sectionId") REFERENCES tutorial_sections(id),
	CONSTRAINT tutorial_sections_progress_fk_1 FOREIGN KEY ("userId") REFERENCES user_information(id)
);

-- Drop table

-- DROP TABLE public.tutorial_tag_relations;

CREATE TABLE public.tutorial_tag_relations (
	id serial NOT NULL,
	"tagId" int4 NOT NULL,
	"tutorialId" int4 NOT NULL,
	CONSTRAINT tutorial_tag_relations_pk PRIMARY KEY ("tagId", "tutorialId"),
	CONSTRAINT tutorial_tag_relations_fk_1 FOREIGN KEY ("tutorialId") REFERENCES tutorials(id)
);

-- Drop table

-- DROP TABLE public.tutorials;

CREATE TABLE public.tutorials (
	id serial NOT NULL,
	title varchar NULL,
	description1 varchar NULL,
	description2 varchar NULL,
	enabled bool NULL,
	color varchar NOT NULL,
	"featuredImage" varchar NULL,
	"userId" int4 NOT NULL,
	slug varchar NULL,
	CONSTRAINT tutorials_pk PRIMARY KEY (id),
	CONSTRAINT tutorials_un UNIQUE (slug),
	CONSTRAINT tutorials_fk FOREIGN KEY ("userId") REFERENCES user_information(id)
);

-- Drop table

-- DROP TABLE public.user_account_information;

CREATE TABLE public.user_account_information (
	email varchar NOT NULL,
	id serial NOT NULL,
	"userId" serial NOT NULL,
	username varchar NOT NULL,
	CONSTRAINT user_account_information_pk PRIMARY KEY (id),
	CONSTRAINT user_account_information_fk FOREIGN KEY ("userId") REFERENCES user_information(id)
);

-- Drop table

-- DROP TABLE public.user_information;

CREATE TABLE public.user_information (
	name varchar NULL,
	id serial NOT NULL,
	about varchar NULL,
	website varchar NULL,
	heading varchar NULL,
	"profileImage" varchar NULL,
	uid varchar NOT NULL,
	auth_provider int4 NOT NULL,
	CONSTRAINT user_information_pk PRIMARY KEY (id),
	CONSTRAINT user_information_un UNIQUE (uid),
	CONSTRAINT user_information_fk FOREIGN KEY (auth_provider) REFERENCES authentication_types(id)
);
