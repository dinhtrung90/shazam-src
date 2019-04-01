package com.vee.shazam.repository.search;

import com.vee.shazam.domain.Question;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Question entity.
 */
public interface QuestionSearchRepository extends ElasticsearchRepository<Question, Long> {
}
