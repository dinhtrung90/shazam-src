package com.vee.shazam.repository.search;

import com.vee.shazam.domain.ResponseChoice;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ResponseChoice entity.
 */
public interface ResponseChoiceSearchRepository extends ElasticsearchRepository<ResponseChoice, Long> {
}
