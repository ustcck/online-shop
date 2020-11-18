package com.ustcck.shop.repository;

import com.ustcck.shop.domain.WishList;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the WishList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WishListRepository extends JpaRepository<WishList, Long>, JpaSpecificationExecutor<WishList> {
}
