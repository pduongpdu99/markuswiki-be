import { Prisma } from "@prisma/prisma/client";

export const articleCountForTags = Prisma.sql`
SELECT
    tags.id,
    COUNT(article.id) AS article_count,
    COALESCE(
        JSON_ARRAYAGG(
            CASE
                WHEN article.id IS NOT NULL THEN
                    JSON_OBJECT(
                        'id', article.id,
                        'title', article.title,
                        'title_vi', article.title_vi,
                        'description', article.description,
                        'description_vi', article.description_vi,
                        'tags', article.tags,
                        -- 'content', article.content,
                        -- 'content_vi', article.content_vi,
                        'slug', article.slug
                    )
            END
        ),
        JSON_ARRAY()
    ) as articles
FROM markus_wiki.tags AS tags
LEFT JOIN markus_wiki.article AS article
    ON JSON_CONTAINS(
    article.tags,
    JSON_QUOTE(tags.slug)
    )
GROUP BY tags.id
`;

