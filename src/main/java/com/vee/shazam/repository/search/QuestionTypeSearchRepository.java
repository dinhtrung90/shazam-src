package com.vee.shazam.repository.search;

import com.vee.shazam.domain.QuestionType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the QuestionType entity.
 */
public interface QuestionTypeSearchRepository extends ElasticsearchRepository<QuestionType, Long> {
}
