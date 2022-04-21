package com.thomasmoore.otter.mvc.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	//firstName, lastName, username, email, password, @Transient confirmPassword, n:m friends, 1:n posts
	
	@NotBlank(message="First name is required")
	@Size(min=2, max=49, message="First name must be between 2 and 49 characters ")
	private String firstName;
	
	@NotBlank(message="Last name is required")
	@Size(min=2, max=49, message="Last name must be between 2 and 49 characters ")
	private String lastName;
	
	@NotBlank(message="Email is required")
	@Email(message="Please enter a valid email address")
	private String email;
	
	@NotBlank(message="Password is required")
	@Size(min=6, max = 99, message="Password must be between 6 and 99 characters")
	private String password;
	
	@Transient
	private String confirmPassword;
	
	//n:m Might need to use a one to many and many to one? 
	
	
	//1:n
	@OneToMany(mappedBy="user")
	private List<Post> posts;
	
	
	
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



