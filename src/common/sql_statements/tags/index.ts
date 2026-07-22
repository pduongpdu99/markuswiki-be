import { Prisma } from "@prisma/prisma/client";

export const articleCountForTags = Prisma.sql`
SELECT
    tags.id,
    COUNT(article.id) AS article_count
FROM markus_wiki.tags AS tags
LEFT JOIN markus_wiki.article AS article
    ON JSON_CONTAINS(
    article.tags,
    JSON_QUOTE(tags.slug)
    )
GROUP BY tags.id
`;

