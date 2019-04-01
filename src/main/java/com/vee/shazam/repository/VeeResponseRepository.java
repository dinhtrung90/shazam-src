package com.vee.shazam.repository;

import com.vee.shazam.domain.VeeResponse;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the VeeResponse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VeeResponseRepository extends JpaRepository<VeeResponse, Long> {

}
