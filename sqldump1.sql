--
-- PostgreSQL database dump
--

-- Dumped from database version 13.7 (Ubuntu 13.7-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: STATUS; Type: TYPE; Schema: public; Owner: ykaopqieppywjs
--

CREATE TYPE "public"."STATUS" AS ENUM (
    'DISABLED',
    'ENABLED'
);


ALTER TYPE public."STATUS" OWNER TO ykaopqieppywjs;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: ykaopqieppywjs
--

CREATE TABLE "public"."_prisma_migrations" (
    "id" character varying(36) NOT NULL,
    "checksum" character varying(64) NOT NULL,
    "finished_at" timestamp with time zone,
    "migration_name" character varying(255) NOT NULL,
    "logs" "text",
    "rolled_back_at" timestamp with time zone,
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "applied_steps_count" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO ykaopqieppywjs;

--
-- Name: novel; Type: TABLE; Schema: public; Owner: ykaopqieppywjs
--

CREATE TABLE "public"."novel" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "name" "text" NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL,
    "thumbnailUrl" "text" NOT NULL,
    "defaultSource" "text",
    "status" "public"."STATUS" DEFAULT 'ENABLED'::"public"."STATUS" NOT NULL,
    "sourceId" "uuid"
);


ALTER TABLE public.novel OWNER TO ykaopqieppywjs;

--
-- Name: source; Type: TABLE; Schema: public; Owner: ykaopqieppywjs
--

CREATE TABLE "public"."source" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "source" "text" NOT NULL,
    "novelId" "uuid" NOT NULL,
    "chapterUrl" "text" DEFAULT ''::"text" NOT NULL,
    "chapterNumber" integer NOT NULL,
    "updatedAt" timestamp(6) with time zone NOT NULL,
    "linkSelector" "text" NOT NULL,
    "titleSelector" "text" NOT NULL,
    "numberSelector" "text" NOT NULL,
    "chapterTitle" "text" NOT NULL,
    "sourceUrl" "text" NOT NULL,
    "roleId" "text",
    "channelId" "text" DEFAULT '745704147512328202'::"text" NOT NULL,
    "status" "public"."STATUS" DEFAULT 'ENABLED'::"public"."STATUS" NOT NULL
);


ALTER TABLE public.source OWNER TO ykaopqieppywjs;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: ykaopqieppywjs
--

COPY "public"."_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count") FROM stdin;
\.


--
-- Data for Name: novel; Type: TABLE DATA; Schema: public; Owner: ykaopqieppywjs
--

COPY "public"."novel" ("id", "slug", "name", "createdAt", "updatedAt", "thumbnailUrl", "defaultSource", "status", "sourceId") FROM stdin;
e9479ff2-0a64-4b6b-83ef-5dccf3147176	ki	Keyboard Immortal	2021-12-12 11:37:35.272+00	2021-12-12 11:37:35.272936+00	https://cdn.wuxiaworld.com/images/covers/ki.jpg	raw	ENABLED	\N
f6e958a9-e924-4b78-8710-f303181ee03e	iacb	I’m Actually a Cultivation Bigshot	2021-12-12 11:37:36.496+00	2021-12-12 11:37:36.497475+00	https://cdn.novelupdates.com/images/2021/01/Im-Actually-a-Cultivation-Bigshot.jpg	raw	ENABLED	\N
7d450eb8-a2a4-4d02-979e-22fa1c44d311	nshba	Nine Star Hegemon Body Art	2021-12-12 11:37:37.711+00	2021-12-12 11:37:37.71232+00	https://lnmtl.com/assets/images/novel/391-200.jpg	raw	ENABLED	\N
27ff95a2-553e-4d9e-baf1-436a167da5a0	pop	Protect our Patriarch	2021-12-12 11:37:39.164+00	2021-12-12 11:37:39.164957+00	https://cdn.shucdn.com/files/article/image/35/35523/35523s.jpg	raw	ENABLED	\N
9700b5ed-b68d-44ad-8f3d-30d8cfc2e8d5	mcbw	My Cold and Beautiful Wife	2021-12-12 11:37:31.97+00	2021-12-31 16:04:26.112888+00	https://lnmtl.com/upload/novel/416.jpg	ptwxz	ENABLED	\N
1f5aa5f1-dc34-41ee-be35-8c0d4cd31afb	fgaa	First God of All Ages	2022-01-10 16:45:03.011+00	2022-01-10 16:45:03.01121+00	https://lnmtl.com/assets/images/novel/599-200.jpg	lnmtl	ENABLED	\N
aeaec1c3-f383-4ae7-9b76-ad7dbd0a3807	ge	Grasping Evil	2021-12-28 12:45:06.631+00	2022-04-15 19:18:03.015008+00	https://lnmtl.com/assets/images/novel/91-200.jpg	lnmtl	DISABLED	\N
\.


--
-- Data for Name: source; Type: TABLE DATA; Schema: public; Owner: ykaopqieppywjs
--

COPY "public"."source" ("id", "source", "novelId", "chapterUrl", "chapterNumber", "updatedAt", "linkSelector", "titleSelector", "numberSelector", "chapterTitle", "sourceUrl", "roleId", "channelId", "status") FROM stdin;
6d4c9d62-0adf-49ea-8577-6503ad55c0fe	ptwxz	27ff95a2-553e-4d9e-baf1-436a167da5a0	https://www.ptwxz.com/html/14/14126/10253510.html	1	2022-08-26 23:45:06.12808+00	#centerm > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > li:nth-child(1) > a:nth-child(1)	#centerm > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > li:nth-child(1) > a:nth-child(1)	#centerm > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > li:nth-child(1) > a:nth-child(1)	Pick up garbage in Shenwu Tianxu in Anye	https://www.ptwxz.com/bookinfo/14/14126.html	977524948715319356	745704147512328202	ENABLED
6ecdabf3-ec73-489d-95ed-595117332393	lnmtl	27ff95a2-553e-4d9e-baf1-436a167da5a0	https://lnmtl.com/chapter/protect-our-patriarch-chapter-3	3	2022-08-27 01:05:11.845756+00	table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)	table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)	table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1) > span:nth-child(1)	Lici moistens to mix the Saint territory	https://lnmtl.com/novel/protect-our-patriarch	899276141439901736	745704147512328202	ENABLED
8c8ff2d1-5b8e-4817-9953-6b80bf6efcc7	ybiquge	27ff95a2-553e-4d9e-baf1-436a167da5a0	http://m.ybiquge.com/41_41466/549920.html	211	2022-06-17 23:10:08.137159+00	ul.chapter:nth-child(9) > li:nth-child(1) > a:nth-child(1)	ul.chapter:nth-child(9) > li:nth-child(1) > a:nth-child(1)	ul.chapter:nth-child(9) > li:nth-child(1) > a:nth-child(1)	I really just want to retire quietly	http://m.ybiquge.com/41_41466/	933712014847664148	745704147512328202	ENABLED
50e6f353-6702-4350-bcd0-7d80ba722cd9	raw	27ff95a2-553e-4d9e-baf1-436a167da5a0	https://www.69shu.com/txt/35523/29997209	720	2022-08-27 23:35:10.753007+00	.qustime > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)	.qustime > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1) > span:nth-child(1)	.qustime > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1) > span:nth-child(1)	Shou Zhe Chengxian Sutra! Sacred blood	https://www.69shu.com/txt/35523.htm	893739996949905438	745704147512328202	ENABLED
34671079-8eec-43a8-9d4a-041db1d42633	raw	7d450eb8-a2a4-4d02-979e-22fa1c44d311	https://www.ptwxz.com/html/7/7811/10254681.html	5025	2022-08-28 00:45:05.952372+00	#centerm > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > li:nth-child(1) > a:nth-child(1)	#centerm > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > li:nth-child(1) > a:nth-child(1)	#centerm > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > li:nth-child(1) > a:nth-child(1)	Ghost split thorns	https://www.ptwxz.com/bookinfo/7/7811.html	860838180595695617	745704147512328202	ENABLED
a5d41597-296d-4377-93cd-9c21d74b6b85	raw	e9479ff2-0a64-4b6b-83ef-5dccf3147176	https://www.ptwxz.com/html/11/11622/10254995.html	1384	2022-08-28 08:20:02.414593+00	#centerm > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > li:nth-child(1) > a:nth-child(1)	#centerm > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > li:nth-child(1) > a:nth-child(1)	#centerm > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > li:nth-child(1) > a:nth-child(1)	resentment	https://www.ptwxz.com/bookinfo/11/11622.html	860838177908588584	745704147512328202	ENABLED
07cc479c-a045-4b77-8424-e7a2cf02c12d	shen	27ff95a2-553e-4d9e-baf1-436a167da5a0	https://www.shenmaxs.com/27_27600/33112523.html	528	2022-05-21 10:55:09.215074+00	div.container:nth-child(4) > div:nth-child(2) > a:nth-child(1)	div.container:nth-child(4) > div:nth-child(2) > a:nth-child(1)	div.container:nth-child(4) > div:nth-child(2) > a:nth-child(1)	Promotion! Fugui Xintong	https://www.shenmaxs.com/27_27600/	930138708223606825	745704147512328202	DISABLED
395b3c6e-4d36-4ba2-b613-61ba617db4f2	uukanshu	27ff95a2-553e-4d9e-baf1-436a167da5a0	https://www.uukanshu.com/b/146861/72587.html	82	2022-05-21 10:55:09.215333+00	#chapterList > li:nth-child(1) > a:nth-child(1)	#chapterList > li:nth-child(1) > a:nth-child(1)	#chapterList > li:nth-child(1) > a:nth-child(1)	Promotion! Fugui Xintong	https://www.uukanshu.com/b/146861/	930120108100186112	745704147512328202	DISABLED
280ea4a9-b00d-4113-9b01-e2a422446f78	shen	9700b5ed-b68d-44ad-8f3d-30d8cfc2e8d5	https://www.shenmaxs.com/42_42392/33082279.html	4067	2022-05-21 10:55:09.215602+00	div.container:nth-child(4) > div:nth-child(2) > a:nth-child(1)	div.container:nth-child(4) > div:nth-child(2) > a:nth-child(1)	div.container:nth-child(4) > div:nth-child(2) > a:nth-child(1)	Night	https://www.shenmaxs.com/42_42392/	930137312388599829	745704147512328202	DISABLED
27f7f099-c228-4e33-bdc0-607a43e529e3	lnmtl	7d450eb8-a2a4-4d02-979e-22fa1c44d311	https://lnmtl.com/chapter/nine-star-hegemon-body-art-book-12-chapter-5025	5025	2022-08-28 00:55:06.394372+00	table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)	table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)	table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1) > span:nth-child(1)	Ghost Water Splitting Thorn	https://lnmtl.com/novel/nine-star-hegemon-body-art	745708762391642162	745704147512328202	ENABLED
d3d28adb-3d76-4f97-abab-9d7e0232f4ce	UUKANSHU	7d450eb8-a2a4-4d02-979e-22fa1c44d311	https://www.uukanshu.com/b/69988/224394.html	4671	2022-05-21 10:55:09.214571+00	#chapterList > li:nth-child(1) > a:nth-child(1)	#chapterList > li:nth-child(1) > a:nth-child(1)	#chapterList > li:nth-child(1) > a:nth-child(1)	Empire strong	https://www.uukanshu.com/b/69988/	930135247847297044	745704147512328202	DISABLED
4183b515-7e54-4759-8969-876979a5109d	shen	7d450eb8-a2a4-4d02-979e-22fa1c44d311	https://www.shenmaxs.com/27_27363/33128131.html	4669	2022-05-21 10:55:09.214462+00	div.container:nth-child(4) > div:nth-child(2) > a:nth-child(1)	div.container:nth-child(4) > div:nth-child(2) > a:nth-child(1)	div.container:nth-child(4) > div:nth-child(2) > a:nth-child(1)	Gold bones	https://www.shenmaxs.com/27_27363/	930139344671494216	745704147512328202	DISABLED
23bc81ee-5307-4bef-bd71-b4a19979537c	raw	f6e958a9-e924-4b78-8710-f303181ee03e	https://www.ptwxz.com/html/11/11950/10232890.html	945	2022-08-09 10:35:03.081132+00	#centerm > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > li:nth-child(1) > a:nth-child(1)	#centerm > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > li:nth-child(1) > a:nth-child(1)	#centerm > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > li:nth-child(1) > a:nth-child(1)	One thought	https://www.ptwxz.com/bookinfo/11/11950.html	865139746523316254	745704147512328202	ENABLED
6ebbd53a-5c9d-4ada-9393-22f7ff916569	lnmtl	f6e958a9-e924-4b78-8710-f303181ee03e	https://lnmtl.com/chapter/i-m-actually-a-cultivation-bigshot-chapter-946	946	2022-08-13 21:40:06.225559+00	table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)	table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)	table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1) > span:nth-child(1)	The Li Nianfan’s choice, Great Way turns over to the source( big result)	https://lnmtl.com/novel/i-m-actually-a-cultivation-bigshot	926873800627355679	745704147512328202	ENABLED
d41ce3bf-b1c4-48aa-85f8-0569d3e327fa	sobiquge	9700b5ed-b68d-44ad-8f3d-30d8cfc2e8d5	https://www.sobiquge.com/book/30867/1312776.html	4246	2022-05-30 16:50:43.063515+00	#info > p:nth-child(5) > a:nth-child(1)	#info > p:nth-child(5) > a:nth-child(1)	#info > p:nth-child(5) > a:nth-child(1)	Destroyed in one breath	https://www.sobiquge.com/book/30867/	930136323841482833	745704147512328202	ENABLED
fe6e3127-f7fa-4297-986f-e207b37e9a6e	ptwxz	9700b5ed-b68d-44ad-8f3d-30d8cfc2e8d5	https://www.ptwxz.com/html/8/8965/10193379.html	4297	2022-07-14 03:36:40.453508+00	#centerm > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > li:nth-child(1) > a:nth-child(1)	#centerm > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > li:nth-child(1) > a:nth-child(1)	#centerm > div:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(7) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1) > li:nth-child(1) > a:nth-child(1)	Under the finale	https://www.ptwxz.com/bookinfo/8/8965.html	901850340255727677	745704147512328202	ENABLED
0e4574aa-f221-4223-be68-9e6fb0963f49	lnmtl	1f5aa5f1-dc34-41ee-be35-8c0d4cd31afb	https://lnmtl.com/chapter/first-god-of-all-ages-chapter-3240	3240	2022-05-21 10:55:09.215908+00	table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)	table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)	table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1) > span:nth-child(1)	The children, do not ask too	https://lnmtl.com/novel/first-god-of-all-ages	930140571849326622	745704147512328202	DISABLED
499ac6d5-a203-4683-8187-18b4e15f08be	raw	9700b5ed-b68d-44ad-8f3d-30d8cfc2e8d5	http://www.wucuoxs.com/80858/718734295.html	4297	2022-07-14 04:35:46.183814+00	#list > dl:nth-child(1) > dd:nth-child(2) > a:nth-child(1)	#list > dl:nth-child(1) > dd:nth-child(2) > a:nth-child(1)	#list > dl:nth-child(1) > dd:nth-child(2) > a:nth-child(1)	Under the finale	http://www.wucuoxs.com/80858/	677986539372019724	745704147512328202	ENABLED
00d68bf8-9e06-4453-ab98-626216fc5c2d	lnmtl	aeaec1c3-f383-4ae7-9b76-ad7dbd0a3807	https://lnmtl.com/chapter/grasping-evil-chapter-1274-part-2	1274	2022-05-21 10:55:09.215944+00	table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)	table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)	table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1) > span:nth-child(1)	Part 2 Wins firmly joyfully, the defeat is also encouraging	https://lnmtl.com/novel/grasping-evil	925376034579304488	745704147512328202	DISABLED
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: ykaopqieppywjs
--

ALTER TABLE ONLY "public"."_prisma_migrations"
    ADD CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id");


--
-- Name: novel novel_pkey; Type: CONSTRAINT; Schema: public; Owner: ykaopqieppywjs
--

ALTER TABLE ONLY "public"."novel"
    ADD CONSTRAINT "novel_pkey" PRIMARY KEY ("id");


--
-- Name: source source_pkey; Type: CONSTRAINT; Schema: public; Owner: ykaopqieppywjs
--

ALTER TABLE ONLY "public"."source"
    ADD CONSTRAINT "source_pkey" PRIMARY KEY ("id");


--
-- Name: novel_name_idx; Type: INDEX; Schema: public; Owner: ykaopqieppywjs
--

CREATE INDEX "novel_name_idx" ON "public"."novel" USING "btree" ("name");


--
-- Name: novel_slug_idx; Type: INDEX; Schema: public; Owner: ykaopqieppywjs
--

CREATE INDEX "novel_slug_idx" ON "public"."novel" USING "btree" ("slug");


--
-- Name: novel_slug_key; Type: INDEX; Schema: public; Owner: ykaopqieppywjs
--

CREATE UNIQUE INDEX "novel_slug_key" ON "public"."novel" USING "btree" ("slug");


--
-- Name: source_chapterNumber_chapterTitle_chapterUrl_updatedAt_idx; Type: INDEX; Schema: public; Owner: ykaopqieppywjs
--

CREATE INDEX "source_chapterNumber_chapterTitle_chapterUrl_updatedAt_idx" ON "public"."source" USING "btree" ("chapterNumber", "chapterTitle", "chapterUrl", "updatedAt");


--
-- Name: source_sourceUrl_key; Type: INDEX; Schema: public; Owner: ykaopqieppywjs
--

CREATE UNIQUE INDEX "source_sourceUrl_key" ON "public"."source" USING "btree" ("sourceUrl");


--
-- Name: source_source_sourceUrl_idx; Type: INDEX; Schema: public; Owner: ykaopqieppywjs
--

CREATE INDEX "source_source_sourceUrl_idx" ON "public"."source" USING "btree" ("source", "sourceUrl");


--
-- Name: novel novel_sourceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ykaopqieppywjs
--

ALTER TABLE ONLY "public"."novel"
    ADD CONSTRAINT "novel_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "public"."source"("id") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: source source_novelId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ykaopqieppywjs
--

ALTER TABLE ONLY "public"."source"
    ADD CONSTRAINT "source_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "public"."novel"("id") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

