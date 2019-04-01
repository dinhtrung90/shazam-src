package com.vee.shazam.repository.search;

import com.vee.shazam.domain.Respondent;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Respondent entity.
 */
public interface RespondentSearchRepository extends ElasticsearchRepository<Respondent, Long> {
}
