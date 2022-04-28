package com.thomasmoore.otter.mvc.models;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
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
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonManagedReference;


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
	
	@Column(unique = true)
	@NotBlank(message="Email is required")
	@Email(message="Please enter a valid email address")
	@Pattern(regexp="^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" 
	        + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$", message="Please enter a valid email address")
	private String email;
	
	@NotBlank(message="Password is required")
	@Size(min=6, max = 99, message="Password must be between 6 and 99 characters")
	private String password;
	
	@Transient
	private String confirmPassword;
	

	//1:n
//	@JsonManagedReference
	@OneToMany(mappedBy="user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
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
	
	public User() {}

	public User(
			@NotBlank(message = "First name is required") @Size(min = 2, max = 49, message = "First name must be between 2 and 49 characters ") String firstName,
			@NotBlank(message = "Last name is required") @Size(min = 2, max = 49, message = "Last name must be between 2 and 49 characters ") String lastName,
			@NotBlank(message = "Email is required") @Email(message = "Please enter a valid email address") String email,
			@NotBlank(message = "Password is required") @Size(min = 6, max = 99, message = "Password must be between 6 and 99 characters") String password,
			String confirmPassword, List<Post> posts) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.confirmPassword = confirmPassword;
		this.posts = posts;
	}

	public User(Long id,
			@NotBlank(message = "First name is required") @Size(min = 2, max = 49, message = "First name must be between 2 and 49 characters ") String firstName,
			@NotBlank(message = "Last name is required") @Size(min = 2, max = 49, message = "Last name must be between 2 and 49 characters ") String lastName,
			@NotBlank(message = "Email is required") @Email(message = "Please enter a valid email address") String email,
			@NotBlank(message = "Password is required") @Size(min = 6, max = 99, message = "Password must be between 6 and 99 characters") String password,
			String confirmPassword, List<Post> posts) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.confirmPassword = confirmPassword;
		this.posts = posts;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	public List<Post> getPosts() {
		return posts;
	}

	public void setPosts(List<Post> posts) {
		this.posts = posts;
	}

	public Date getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}

	public Date getUpdated_at() {
		return updated_at;
	}

	public void setUpdated_at(Date updated_at) {
		this.updated_at = updated_at;
	}
	
	
}



