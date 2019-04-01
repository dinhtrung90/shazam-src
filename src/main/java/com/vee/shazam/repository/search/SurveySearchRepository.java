package com.vee.shazam.repository.search;

import com.vee.shazam.domain.Survey;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Survey entity.
 */
public interface SurveySearchRepository extends ElasticsearchRepository<Survey, Long> {
}
