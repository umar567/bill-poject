# -*- coding: utf-8 -*-
# Copyright (c) 2020, Havenir Solutions and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
import datetime

class LescoElectricityBill(Document):
	def validate(self):

		total1 = 0
		total2 = 0
		total3 = 0
		total4 = 0
		for row in self.daily_reading:
			total1 += row.kwh_offtime
			total2 += row.kwh_peaktime
			total3 += row.kvarh_offtime
			total4 += row.kvarh_peaktime
		
		self.kwh_offtime_total = total1
		self.kwh_peaktime_total = total2
		self.kvarh_offtime_total = total3
		self.kvarh_peaktime_total = total4
		


	def before_save(self):

		frappe.msgprint('Your data has been saved')

	def paymentmethod(self):
		# Creating new document object
		#example new_doc = frappe.new_doc('Docname')
		payment_entry = frappe.new_doc('Payment Entry')	
		payment_entry.party_type = 'Supplier'
		payment_entry.paid_ammount = self.current_bill
		name = payment_entry.name 
		payment_entry.mode_of_payment = 'Cash'
		payment_entry.payment_type = 'Pay'
		payment_entry.party = 'Lesco'
		payment_entry.party_name = 'Lesco'
		payment_entry.account_type = 'Cash'

		payment_entry.date = datetime.datetime.now

		
		""" Set values to the new document
		example:
		payment_entry.party_type = 'Supplier' 
		"""
		
		
		"""After setting all the fields and applying logic
		call insert method on the document object to create
		a new record in the database.
		This is assign a new unique name to the document object
		that can be accessed by `object.name`
		"""
		payment_entry.insert()
		
		
		#Call submit method on document to permanently submit the document
		payment_entry.submit()
		frappe.msgprint("Your payment has been submitted")
		
		

