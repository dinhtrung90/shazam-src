package com.vee.shazam.repository.search;

import com.vee.shazam.domain.SurveyResponse;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the SurveyResponse entity.
 */
public interface SurveyResponseSearchRepository extends ElasticsearchRepository<SurveyResponse, Long> {
}
