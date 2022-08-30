create table if not exists donor (
	donor_id text primary key,
	donor_name text,
	donor_address text,
	donor_phone_number text,
	donor_username text,
    donor_password text
);

create table if not exists user_ (
	user_id text primary key,
	username text,
	password text,
	name text,
	role text
);

create table if not exists item (
	item_id text primary key,
	donation_type text,
	quantity text,
	donor_id text,
	foreign key(donor_id) references donor(donor_id) on update cascade
);

create table if not exists received (
	item_id text primary key,
	donor_id text,
	donation_type text,
	quantity text,
	foreign key(donor_id) references donor(donor_id) on update cascade,
	foreign key(item_id) references item(item_id) on update cascade
);

create table if not exists not_received (
	item_id text primary key,
	donor_id text,
	donation_type text,
	quantity text,
	foreign key(donor_id) references donor(donor_id) on update cascade,
	foreign key(item_id) references item(item_id) on update cascade
);

create table if not exists rider (
	rider_id text primary key,
	rider_name text,
	rider_phone_number text,
	rider_username text,
	rider_password text,
	rider_status text
);

create table if not exists scheduled(
	sched_id text primary key,
	time time,
	date date,
	donor_id text,
	donor_info text,
	rider_id text,
	item_id text,
	user_id text,
	foreign key(donor_id) references donor(donor_id) on update cascade,
	foreign key(rider_id) references rider(rider_id) on update cascade,
	foreign key(item_id) references item(item_id) on update cascade,
	foreign key(user_id) references user_(user_id) on update cascade
);

create table if not exists admin_user (
	username text primary key,
	password text,
	user_id text
);

create table if not exists donor_user (
	username text primary key,
	password text,
	donor_id text
);

create table if not exists rider_user (
	username text primary key,
	password text,
	rider_id text
);

create table if not exists userpass (
	username text primary key,
	password text
);

create or replace function login(par_username text,
							     par_password text) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tablerow record;
begin 
   select into loc_tablerow * from user_ where username = par_username;
   
   if loc_tablerow.username != par_username then
	  return json_build_object(
		'Message', 'Incorrect username'
		);
   elsif loc_tablerow.password != par_password then
   	  return json_build_object(
		'Message', 'Incorrect password'
		);
   else
   	  insert into admin_user(username, password, user_id) values (par_username, par_password, loc_tablerow.user_id);
   	  return json_build_object(
		'Message', 'Welcome, Admin.',
		'status', 'OK',
		'username', loc_tablerow.username,
		'password', loc_tablerow.password,
		'id', loc_tablerow.user_id
		);
   end if;
end;
$$;

create or replace function logout()
    RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_id text;
begin 
   select into loc_id username from admin_user;
   delete from admin_user where username = loc_id;
   return json_build_object(
		'Message', 'Good bye, Admin.'
	);
end;
$$;

create or replace function display_admin() 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tasks_record record;
  loc_tasks_json json[];
  loc_size int default 0;
begin 
	for loc_tasks_record in select username, name from user_ loop
		loc_tasks_json = loc_tasks_json || 
						 json_build_object(
							'username', loc_tasks_record.username,
							'name', loc_tasks_record.name
						 );
		loc_size = loc_size + 1;
		
	end loop; 
	
	return json_build_object(
		'status', 'OK',
		'size', loc_size,
		'tasks', loc_tasks_json
	);
end; 
$$;
--select display_admin();
create or replace function login_donor(par_donor_username text,
									   par_donor_password text) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tablerow record;
  loc_task_record record;
begin 
    select into loc_tablerow * from donor where donor_username = par_donor_username;					  
	if par_donor_username != loc_tablerow.donor_username then
		return json_build_object(
			'Message', 'Incorrect username.'
		);
	elsif loc_tablerow.donor_password != par_donor_password then
		return json_build_object(
			'Message', 'Incorrect password.'
		);
	else
		insert into donor_user(username, password, donor_id) values (par_donor_username, par_donor_password, loc_tablerow.donor_id);
		return json_build_object(
			'Message', 'Welcome, donor.',
			'status', 'OK',
			'username', loc_tablerow.donor_username,
			'password', loc_tablerow.donor_password,
			'id', loc_tablerow.donor_id
		);
	 end if;
end;
$$;
--select login_donor('juandelacruz', 'juandelacruz');
--select logout_donor();
--select display_donor();
create or replace function donor_registration(par_donor_id text,
											  par_donor_name text,
											  par_donor_address text,
											  par_donor_phone_number text,
											  par_donor_username text,
											  par_donor_password text) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_id text;
  loc_res text;
  loc_username text;
begin 
   select into loc_id donor_id from donor where donor_id = par_donor_id;
   select into loc_username donor_username from donor where donor_username = par_donor_username;
   
   if loc_username = par_donor_username then
   		loc_res = 'Username already exist!';
	else
		if loc_id isnull then
			insert into donor(donor_id, donor_name, donor_address, donor_phone_number, donor_username, donor_password)
			values (par_donor_id, par_donor_name, par_donor_address, par_donor_phone_number, par_donor_username, par_donor_password);
			loc_res = 'Welcome, donor.';
		else
			loc_res = 'ID EXISTED';
		end if;
	end if;
    return json_build_object(
	      'status', loc_res
	 );
end;
$$;

create or replace function edit_donor(par_donor_id text,
									  par_donor_name text,
									  par_donor_address text,
									  par_donor_phone_number text)
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tablerow record;
begin 
   
   if par_donor_id isnull or
   	  par_donor_name isnull or
   	  par_donor_address isnull or
	  par_donor_phone_number isnull then
		return json_build_object(
			'Message', 'Null'
		);
	else
		update donor set donor_name = par_donor_name,
						 donor_address = par_donor_address, 
						 donor_phone_number = par_donor_phone_number
		where donor_id = par_donor_id;
		return json_build_object(
			'status', 'Donor information updated successfully.'
		);
	end if;
end;
$$;

create or replace function delete_donor(par_donor_id text) 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_id text;
  loc_res text;
begin 
   select into loc_id donor_id from donor where donor_id = par_donor_id;
   
   if loc_id isnull then
   		loc_res = 'ID DOES NOT EXISTS';
	else
		delete from donor where donor_id = par_donor_id;
		loc_res = 'Donor deleted';
	end if;
    return json_build_object(
	      'status', loc_res
	 );
end;
$$;

create or replace function search_donor(par_donor_id text) 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tablerow record;
begin 
   select into loc_tablerow * from donor where donor_id = par_donor_id;

   return json_build_object(
		'donor_id', loc_tablerow.donor_id,
	    'donor_name', loc_tablerow.donor_name,
	    'donor_address', loc_tablerow.donor_address,
	    'donor_phone_number', loc_tablerow.donor_phone_number
	);
end; 
$$;

create or replace function display_donor() 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tasks_record record;
  loc_tasks_json json[];
  loc_size int default 0;
begin 
	for loc_tasks_record in select donor_id, 
								   donor_name, 
								   donor_address,
								   donor_phone_number,
								   donor_username,
								   donor_password from donor loop
		loc_tasks_json = loc_tasks_json || 
						 json_build_object(
							'donor_id', loc_tasks_record.donor_id,
							'donor_name', loc_tasks_record.donor_name,
							'donor_address', loc_tasks_record.donor_address,
							'donor_phone_number', loc_tasks_record.donor_phone_number,
							'donor_username', loc_tasks_record.donor_username,
							'donor_password', loc_tasks_record.donor_password
						 );
		loc_size = loc_size + 1;
		
	end loop; 
	
	return json_build_object(
		'status', 'OK',
		'size', loc_size,
		'tasks', loc_tasks_json
	);
end; 
$$;

create or replace function logout_donor()
    RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_id text;
begin 
   select into loc_id username from donor_user;
   delete from donor_user where username = loc_id;
   return json_build_object(
		'Message', 'Good bye, donor.'
	);
end;
$$;

create or replace function login_rider(par_rider_username text,
									   par_rider_password text) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tablerow record;
begin 
   select into loc_tablerow * from rider where rider_username = par_rider_username;
   
   if loc_tablerow.rider_username != par_rider_username then
	  return json_build_object(
		'Message', 'Incorrect username'
		);
   elsif loc_tablerow.rider_password != par_rider_password then
   	   return json_build_object(
		'Message', 'Incorrect password'
		);
   else
      insert into rider_user(username, password, rider_id) values (par_rider_username, par_rider_password, loc_tablerow.rider_id);
   	  return json_build_object(
		'Message', 'Welcome',
		'status', 'OK',
		'username', loc_tablerow.rider_username,
		'password', loc_tablerow.rider_password
		);
   end if;
end;
$$;

create or replace function rider_registration(par_rider_id text,
											  par_rider_name text,
											  par_rider_phone_number text,
											  par_rider_username text,
											  par_rider_password text) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_id text;
  loc_res text;
  loc_username text;
begin 
   select into loc_id rider_id from rider where rider_id = par_rider_id;
   select into loc_username rider_username from rider where rider_username = par_rider_username;
   
   if loc_username = par_rider_username then
   		return json_build_object(
	      'status', 'Username already exists!'
	 	);
   else
		if loc_id isnull then
				insert into rider(rider_id, rider_name, rider_phone_number, rider_username, rider_password, rider_status)
				values (par_rider_id, par_rider_name, par_rider_phone_number, par_rider_username, par_rider_password, 'Available');
				loc_res = 'Welcome, Rider.';
		else
				loc_res = 'ID EXISTED';
		end if;
   end if;
   return json_build_object(
	      'status', loc_res
   );
	 
end;
$$;

create or replace function edit_rider(par_rider_id text,
									  par_rider_name text,
									  par_rider_phone_number text) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tablerow record;
begin 
   
   if par_rider_id isnull or
   	  par_rider_name isnull or
	  par_rider_phone_number isnull then
		return json_build_object(
			'Message', 'Null'
		);
	else
		update rider set rider_name = par_rider_name,
						 rider_phone_number = par_rider_phone_number
		where rider_id = par_rider_id;
		return json_build_object(
			'status', 'Rider information updated successfully.'
		);
	end if;
end;
$$;

create or replace function edit_rider_availability(par_rider_id text) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_status text;
  loc_res text;
begin 
   select into loc_status rider_status from rider where rider_id = par_rider_id;
   
   if loc_status = 'Available' then
   		update rider set rider_status = 'Not Available' where rider_id = par_rider_id;
		loc_res = 'Updated to not available';
	elsif loc_status = 'Not Available' then
		update rider set rider_status = 'Available' where rider_id = par_rider_id;
		loc_res = 'Updated to available';
	else 
		return json_build_object(
	      'status', 'Null'
	 );
	end if;
	return json_build_object(
	      'status', loc_res
	 );
end;
$$;

create or replace function delete_rider(par_rider_id text) 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_id text;
  loc_res text;
begin 
   select into loc_id rider_id from rider where rider_id = par_rider_id;
   
   if loc_id isnull then
   		loc_res = 'ID DOES NOT EXISTS';
	else
		delete from rider where rider_id = par_rider_id;
		loc_res = 'Rider deleted';
	end if;
    return json_build_object(
	      'status', loc_res
	 );
end;
$$;
--select delete_rider('2022-0001');

create or replace function search_rider(par_rider_id text) 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tablerow record;
begin 
   select into loc_tablerow * from rider where rider_id = par_rider_id;

   return json_build_object(
		'rider_id', loc_tablerow.rider_id,
	    'rider_name', loc_tablerow.rider_name,
	    'rider_phone_number', loc_tablerow.rider_phone_number
	);
end; 
$$;

create or replace function display_rider() 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tasks_record record;
  loc_tasks_json json[];
  loc_size int default 0;
begin 
	for loc_tasks_record in select rider_id, 
								   rider_name, 
								   rider_phone_number,
								   rider_username,
								   rider_password,
								   rider_status from rider loop
		loc_tasks_json = loc_tasks_json || 
						 json_build_object(
							'rider_id', loc_tasks_record.rider_id,
							'rider_name', loc_tasks_record.rider_name,
							'rider_phone_number', loc_tasks_record.rider_phone_number,
							'rider_username', loc_tasks_record.rider_username,
							'rider_password', loc_tasks_record.rider_password,
							'rider_status', loc_tasks_record.rider_status
						 );
		loc_size = loc_size + 1;
		
	end loop; 
	
	return json_build_object(
		'status', 'OK',
		'size', loc_size,
		'tasks', loc_tasks_json
	);
end; 
$$;

create or replace function logout_rider()
    RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_id text;
begin 
   select into loc_id username from rider_user;
   delete from rider_user where username = loc_id;
   return json_build_object(
		'Message', 'Good bye, rider.'
	);
end;
$$;

create or replace function donate_item(par_item_id text,
									   par_donation_type text,
									   par_quantity text) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_id text;
  loc_donor_id text;
  loc_res text;
begin 
   select into loc_id item_id from item where item_id = par_item_id;
   select into loc_donor_id donor_id from donor_user;
   if loc_id isnull then
   		insert into item(item_id, donation_type, quantity, donor_id)
		values (par_item_id, par_donation_type, par_quantity, loc_donor_id);
		loc_res = 'Donation added successfully.';
	else
		loc_res = 'ID EXISTED';
	end if;
    return json_build_object(
	      'status', loc_res
	 );
end;
$$;

create or replace function display_donor_item()
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tasks_record record;
  loc_tablerow record;
  loc_tasks_json json[];
  loc_size int default 0;
  loc_user text;
  loc_id text;
begin 
    --select into loc_user donor_id from donor_user;
    select into loc_tablerow * from donor;
	select into loc_id donor_id from donor_user;
	for loc_tasks_record in select item_id, 
								   donation_type, 
								   quantity,
								   donor_id from item loop
		if loc_tasks_record.donor_id = loc_id then
			loc_tasks_json = loc_tasks_json || 
						json_build_object(
							'item_id', loc_tasks_record.item_id,
							'donation_type', loc_tasks_record.donation_type,
							'quantity', loc_tasks_record.quantity,
							'donor_id', loc_tasks_record.donor_id
						);
			loc_size = loc_size + 1;
		end if;
	end loop; 
	return json_build_object(
		'status', 'OK',
		'size', loc_size,
		'tasks', loc_tasks_json
	);
end; 
$$;
--
create or replace function display_received_by_donor_id() 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tasks_record record;
  loc_tasks_json json[];
  loc_size int default 0;
  loc_tablerow record;
  loc_id text;
begin 
	select into loc_tablerow * from donor;
	select into loc_id donor_id from donor_user;
	for loc_tasks_record in select item_id, 
								   donor_id, 
								   donation_type, 
								   quantity from received loop
		if loc_tasks_record.donor_id = loc_id then
			loc_tasks_json = loc_tasks_json || 
							 json_build_object(
								'item_id', loc_tasks_record.item_id,
								'donor_id', loc_tasks_record.donor_id,
								'donation_type', loc_tasks_record.donation_type,
								'quantity', loc_tasks_record.quantity
							 );
			loc_size = loc_size + 1;
		end if;
	end loop; 
	
	return json_build_object(
		'status', 'OK',
		'size', loc_size,
		'tasks', loc_tasks_json
	);
end; 
$$;

create or replace function display_not_received_by_donor_id() 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tasks_record record;
  loc_tasks_json json[];
  loc_size int default 0;
  loc_tablerow record;
  loc_id text;
begin 
	select into loc_tablerow * from donor;
	select into loc_id donor_id from donor_user;
	for loc_tasks_record in select item_id, 
								   donor_id, 
								   donation_type, 
								   quantity from not_received loop
		if loc_tasks_record.donor_id = loc_id then
			loc_tasks_json = loc_tasks_json || 
							 json_build_object(
								'item_id', loc_tasks_record.item_id,
								'donor_id', loc_tasks_record.donor_id,
								'donation_type', loc_tasks_record.donation_type,
								'quantity', loc_tasks_record.quantity
							 );
			loc_size = loc_size + 1;
		end if;
	end loop; 
	
	return json_build_object(
		'status', 'OK',
		'size', loc_size,
		'tasks', loc_tasks_json
	);
end; 
$$;

create or replace function display_schedule_by_donor_id() 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tasks_record record;
  loc_tasks_json json[];
  loc_size int default 0;
  loc_tablerow record;
  loc_id text;
begin 
	select into loc_tablerow * from donor;
	select into loc_id donor_id from donor_user;
	for loc_tasks_record in select sched_id, 
								   time, 
								   date,
								   donor_id,
								   donor_info,
								   rider_id,
								   item_id,
								   user_id from scheduled loop
		if loc_tasks_record.donor_id = loc_id then
			loc_tasks_json = loc_tasks_json || 
							 json_build_object(
								'sched_id', loc_tasks_record.sched_id,
								'time', loc_tasks_record.time,
								'date', loc_tasks_record.date,
								'donor_id', loc_tasks_record.donor_id,
								'donor_info', loc_tasks_record.donor_info,
								'rider_id', loc_tasks_record.rider_id,
								'item_id', loc_tasks_record.item_id
							 );
			loc_size = loc_size + 1;
		end if;
	end loop; 
	
	return json_build_object(
		'status', 'OK',
		'size', loc_size,
		'tasks', loc_tasks_json
	);
end; 
$$;

create or replace function display_donor_user() 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tasks_record record;
  loc_tasks_json json[];
  loc_size int default 0;
  loc_tablerow record;
  loc_id text;
begin 
	select into loc_tablerow * from donor;
	select into loc_id donor_id from donor_user;
	for loc_tasks_record in select donor_id, 
								   donor_name, 
								   donor_address,
								   donor_phone_number,
								   donor_username,
								   donor_password from donor loop
		if loc_tasks_record.donor_id = loc_id then
			loc_tasks_json = loc_tasks_json || 
							 json_build_object(
								'donor_id', loc_tasks_record.donor_id,
								'donor_name', loc_tasks_record.donor_name,
								'donor_address', loc_tasks_record.donor_address,
								'donor_phone_number', loc_tasks_record.donor_phone_number,
								'donor_username', loc_tasks_record.donor_username,
								'donor_password', loc_tasks_record.donor_password
							 );
			loc_size = loc_size + 1;
		end if;
	end loop; 
	
	return json_build_object(
		'status', 'OK',
		'size', loc_size,
		'tasks', loc_tasks_json
	);
end; 
$$;

create or replace function display_rider_user() 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tasks_record record;
  loc_tasks_json json[];
  loc_size int default 0;
  loc_tablerow record;
  loc_id text;
begin 
	select into loc_tablerow * from rider;
	select into loc_id rider_id from rider_user;
	for loc_tasks_record in select rider_id,
								   rider_name, 
								   rider_username from rider loop
		if loc_tasks_record.rider_id = loc_id then
			loc_tasks_json = loc_tasks_json || 
							 json_build_object(
								'rider_name', loc_tasks_record.rider_name,
								'rider_username', loc_tasks_record.rider_username
							 );
			loc_size = loc_size + 1;
		end if;
	end loop; 
	
	return json_build_object(
		'status', 'OK',
		'size', loc_size,
		'tasks', loc_tasks_json
	);
end; 
$$;

create or replace function display_schedule_by_rider_id() 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tasks_record record;
  loc_tasks_json json[];
  loc_size int default 0;
  loc_tablerow record;
  loc_id text;
begin 
	select into loc_tablerow * from rider;
	select into loc_id rider_id from rider_user;
	for loc_tasks_record in select sched_id, 
								   time, 
								   date,
								   donor_id,
								   donor_info,
								   rider_id,
								   item_id,
								   user_id from scheduled loop
		if loc_tasks_record.rider_id = loc_id then
			loc_tasks_json = loc_tasks_json || 
							 json_build_object(
								'sched_id', loc_tasks_record.sched_id,
								'time', loc_tasks_record.time,
								'date', loc_tasks_record.date,
								'donor_id', loc_tasks_record.donor_id,
								'donor_info', loc_tasks_record.donor_info,
								'rider_id', loc_tasks_record.rider_id,
								'item_id', loc_tasks_record.item_id
							 );
			loc_size = loc_size + 1;
		end if;
	end loop; 
	
	return json_build_object(
		'status', 'OK',
		'size', loc_size,
		'tasks', loc_tasks_json
	);
end; 
$$;

create or replace function display_item() 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tasks_record record;
  loc_tasks_json json[];
  loc_size int default 0;
begin 
	for loc_tasks_record in select item_id, 
								   donation_type, 
								   quantity,
								   donor_id from item loop
		loc_tasks_json = loc_tasks_json || 
						 json_build_object(
							'item_id', loc_tasks_record.item_id,
							'donation_type', loc_tasks_record.donation_type,
							'quantity', loc_tasks_record.quantity,
							'donor_id', loc_tasks_record.donor_id
						 );
		loc_size = loc_size + 1;
		
	end loop; 
	
	return json_build_object(
		'status', 'OK',
		'size', loc_size,
		'tasks', loc_tasks_json
	);
end; 
$$;

create or replace function add_schedule(par_sched_id text,
										par_time time,
										par_date date,
										par_donor_id text,
										par_donor_info text,
										par_rider_id text,
									   	par_item_id text) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_id text;
  loc_admin_id text;
  loc_res text;
begin 
   select into loc_id sched_id from scheduled where sched_id = par_sched_id;
   select into loc_admin_id user_id from admin_user;
   if loc_id isnull then
   		insert into scheduled(sched_id, time, date, donor_id, donor_info, rider_id, item_id, user_id)
		values (par_sched_id, par_time, par_date, par_donor_id, par_donor_info, par_rider_id, par_item_id, loc_admin_id);
		loc_res = 'Schedule added successfully.';
	else
		loc_res = 'ID EXISTED';
	end if;
    return json_build_object(
	      'status', loc_res
	 );
end;
$$;

create or replace function edit_schedule(par_sched_id text,
										 par_time time,
										 par_date date,
										 par_donor_id text,
										 par_donor_info text,
										 par_rider_id text,
									   	 par_item_id text)
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tablerow record;
begin 
   
   if par_sched_id isnull or
   	  par_time isnull or
   	  par_date isnull or
	  par_donor_id isnull or
	  par_donor_info isnull or
	  par_rider_id isnull or
	  par_item_id isnull then
		return json_build_object(
			'Message', 'Null'
		);
	else
		update scheduled set sched_id = par_sched_id,
						 time = par_time, 
						 date = par_date,
						 donor_id = par_donor_id,
						 donor_info = par_donor_info,
						 rider_id = par_rider_id
		where sched_id = par_sched_id;
		return json_build_object(
			'status', 'Schedule updated successfully.'
		);
	end if;
end;
$$;

--select edit_schedule('2022-0001', '07:00:00', '2022/04/13', '2022-0001', 'Dipolog City', '2022-0001', '2022-0001');

create or replace function delete_schedule(par_sched_id text) 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_id text;
  loc_res text;
begin 
   select into loc_id sched_id from scheduled where sched_id = par_sched_id;
   
   if loc_id isnull then
   		loc_res = 'ID DOES NOT EXISTS';
	else
		delete from scheduled where sched_id = par_sched_id;
		loc_res = 'Schedule deleted';
	end if;
    return json_build_object(
	      'status', loc_res
	 );
end;
$$;

select delete_schedule('2022-0003');

create or replace function search_schedule(par_sched_id text) 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tablerow record;
begin 
   select into loc_tablerow * from scheduled where sched_id = par_sched_id;

   return json_build_object(
		'sched_id', loc_tablerow.sched_id,
		'time', loc_tablerow.time,
		'date', loc_tablerow.date,
		'donor_id', loc_tablerow.donor_id,
		'donor_info', loc_tablerow.donor_info,
		'rider_id', loc_tablerow.rider_id,
		'item_id', loc_tablerow.item_id,
		'user_id', loc_tablerow.user_id
	);
end; 
$$;

create or replace function display_schedule() 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tasks_record record;
  loc_tasks_json json[];
  loc_size int default 0;
begin 
	for loc_tasks_record in select sched_id, 
								   time, 
								   date,
								   donor_id,
								   donor_info,
								   rider_id,
								   item_id,
								   user_id from scheduled loop
		loc_tasks_json = loc_tasks_json || 
						 json_build_object(
							'sched_id', loc_tasks_record.sched_id,
							'time', loc_tasks_record.time,
							'date', loc_tasks_record.date,
							'donor_id', loc_tasks_record.donor_id,
							'donor_info', loc_tasks_record.donor_info,
							'rider_id', loc_tasks_record.rider_id,
							'item_id', loc_tasks_record.item_id,
							'user_id', loc_tasks_record.user_id
						 );
		loc_size = loc_size + 1;
		
	end loop; 
	
	return json_build_object(
		'status', 'OK',
		'size', loc_size,
		'tasks', loc_tasks_json
	);
end; 
$$;

create or replace function donation_received(par_item_id text) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_id text;
  loc_res text;
  loc_tablerow record;
  loc_tablerow_schedule record;
begin 
   select into loc_tablerow * from item where item_id = par_item_id;
   select into loc_tablerow_schedule * from scheduled where item_id = par_item_id;
   select into loc_id item_id from received where item_id = par_item_id;
   if loc_id isnull then
   		insert into received(item_id, donor_id, donation_type, quantity)
		values (par_item_id, loc_tablerow.donor_id, loc_tablerow.donation_type, loc_tablerow.quantity);
		delete from scheduled where sched_id = loc_tablerow_schedule.sched_id;
		loc_res = 'Donation received successfully.';
	else
		loc_res = 'Donation already received.';
	end if;
    return json_build_object(
	      'status', loc_res
	 );
end;
$$;

create or replace function display_received() 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tasks_record record;
  loc_tasks_json json[];
  loc_size int default 0;
begin 
	for loc_tasks_record in select item_id, 
								   donor_id, 
								   donation_type, 
								   quantity from received loop
		loc_tasks_json = loc_tasks_json || 
						 json_build_object(
							'item_id', loc_tasks_record.item_id,
							'donor_id', loc_tasks_record.donor_id,
							'donation_type', loc_tasks_record.donation_type,
							'quantity', loc_tasks_record.quantity
						 );
		loc_size = loc_size + 1;
		
	end loop; 
	
	return json_build_object(
		'status', 'OK',
		'size', loc_size,
		'tasks', loc_tasks_json
	);
end; 
$$;

--select display_received();

create or replace function donation_not_received(par_item_id text) RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_id text;
  loc_tablerow record;
  loc_res text;
begin 
   select into loc_tablerow * from item where item_id = par_item_id;
   select into loc_id item_id from not_received where item_id = par_item_id;
   if loc_id isnull then
   		insert into not_received(item_id, donor_id, donation_type, quantity)
		values (par_item_id, loc_tablerow.donor_id, loc_tablerow.donation_type, loc_tablerow.quantity);
		loc_res = 'Donation not received.';
	else
		loc_res = 'ID EXISTED';
	end if;
    return json_build_object(
	      'status', loc_res
	 );
end;
$$;

create or replace function display_not_received() 
	RETURNS json
    LANGUAGE plpgsql
    AS $$
declare
  loc_tasks_record record;
  loc_tasks_json json[];
  loc_size int default 0;
begin 
	for loc_tasks_record in select item_id, 
								   donor_id, 
								   donation_type, 
								   quantity from not_received loop
		loc_tasks_json = loc_tasks_json || 
						 json_build_object(
							'item_id', loc_tasks_record.item_id,
							'donor_id', loc_tasks_record.donor_id,
							'donation_type', loc_tasks_record.donation_type,
							'quantity', loc_tasks_record.quantity
						 );
		loc_size = loc_size + 1;
		
	end loop; 
	
	return json_build_object(
		'status', 'OK',
		'size', loc_size,
		'tasks', loc_tasks_json
	);
end; 
$$;
--select display_not_received(); 