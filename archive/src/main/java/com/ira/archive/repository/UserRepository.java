package com.ira.archive.repository;

import com.ira.archive.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // This is CRITICAL for login. We find a user by their email.
    Optional<User> findByEmail(String email);
}