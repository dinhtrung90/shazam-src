package com.vee.shazam.repository.search;

import com.vee.shazam.domain.QuestionOrder;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the QuestionOrder entity.
 */
public interface QuestionOrderSearchRepository extends ElasticsearchRepository<QuestionOrder, Long> {
}
