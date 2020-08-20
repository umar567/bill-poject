// Copyright (c) 2020, Havenir Solutions and contributors
// For license information, please see license.txt

frappe.ui.form.on('Lesco Electricity Bill', {
	
	refresh: function(frm) {

		frm.add_custom_button('Payment Entry', () => {
			frm.call('paymentmethod', {})
           .then(r => {
           
            let data = r.message;
            
        
    })
		}, 'Create');
		
	},
	
	
	reading_date: function(frm) {
		
		frm.set_value('issue_date', frm.doc.reading_date);

	},
	// total of daily readings
	calculate_total: function (frm){
		let doc = frm.doc;
		let kwh_offtime_totals = 0
		let kwh_peaktime_totals = 0
		let kvarh_offtime_totals = 0
		let kvarh_peaktime_totals = 0
		for (let i in doc.daily_reading){
			kwh_offtime_totals += doc.daily_reading[i].kwh_offtime
			kwh_peaktime_totals += doc.daily_reading[i].kwh_peaktime
			kvarh_offtime_totals += doc.daily_reading[i].kvarh_offtime
			kvarh_peaktime_totals += doc.daily_reading[i].kvarh_peaktime
		}

		frm.set_value('kwh_offtime_total', kwh_offtime_totals)
		frm.set_value('kwh_peaktime_total', kwh_peaktime_totals)
		frm.set_value('kvarh_offtime_total', kvarh_offtime_totals)
		frm.set_value('kvarh_peaktime_total', kvarh_peaktime_totals)
	},

	verify_button: function(frm){

		
          if (frm.doc.super_user==1){
			if (frm.doc.kwh_offtime==frm.doc.kwh_offtime_total && 
				frm.doc.kwh_peektime==frm.doc.kwh_peaktime_total && 
				frm.doc.kvarh_offtime==frm.doc.kvarh_offtime_total && 
				frm.doc.kvarh_peaktime==frm.doc.kvarh_peaktime_total ){
			  
				frappe.msgprint("Values have been matched");
				frm.save('Submit')
				
			}
			else
		{   
			frm.save('Cancel')

			
			frappe.throw("Values are not matching ");
			
			
		}
		

		  }
		  else{
			frm.save('Submit') 
			frappe.msgprint("your data has been submitted");
		  }
	},

	before_submit: function(frm){

		frm.trigger('verify_button')
	}
   

	


	
});

frappe.ui.form.on('Lesco Electricity Bill Readings', {
	kwh_offtime: function(frm, cdt, cdn) {
		// let row = frappe.get_doc(cdt, cdn)
		frm.trigger('calculate_total');
	},

	kwh_peaktime: function(frm, cdt, cdn) {
		// let row = frappe.get_doc(cdt, cdn)
		frm.trigger('calculate_total');	
	},

	kvarh_offtime: function(frm, cdt, cdn) {
		// let row = frappe.get_doc(cdt, cdn)
		frm.trigger('calculate_total');	
	},

	kvarh_peaktime: function(frm, cdt, cdn) {
		// let row = frappe.get_doc(cdt, cdn)
		frm.trigger('calculate_total');	
		
	}
});

