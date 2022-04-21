package com.thomasmoore.otter.mvc.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="posts")
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message="Title is required")
	private String title;
	
	@NotBlank(message="Message is required")
	private String message;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User user;
	
	
	@Column(updatable = false)
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date created_at;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date updated_at;
	
	@PrePersist
	protected void onCreate() {
		this.created_at = new Date();
	}
	
	@PreUpdate
	protected void onUpdate() {
		this.updated_at = new Date();
	}
	
	
}
