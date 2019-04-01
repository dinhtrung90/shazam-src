package com.vee.shazam.repository.search;

import com.vee.shazam.domain.VeeResponse;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the VeeResponse entity.
 */
public interface VeeResponseSearchRepository extends ElasticsearchRepository<VeeResponse, Long> {
}
