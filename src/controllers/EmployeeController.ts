import express from "express";
import { EmployeeModel } from "../db/employee";

export const getAllEmployees = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const employees = await EmployeeModel.find();
    return response.status(200).json({ data: employees });
  } catch (error) {
    return response.sendStatus(400);
  }
};

export const getEmployee = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { id } = request.params;
    const employee = await EmployeeModel.findById(id);
    return response.status(200).json({ data: employee });
  } catch (error) {
    return response.sendStatus(400);
  }
};

export const createEmployee = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { name, email, mobile, dob, doj } = request.body;
    const employee = new EmployeeModel({
      name,
      email,
      mobile,
      dob,
      doj,
    });
    await employee.save();
    return response
      .status(201)
      .json({ message: "Employee Created", data: employee });
  } catch (error) {
    return response.sendStatus(400);
  }
};

export const updateEmployee = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { id } = request.params;
    const { name, email, mobile, dob, doj } = request.body;
    const employee = await EmployeeModel.findById(id);
    if (employee) {
      employee.name = name;
      employee.email = email;
      employee.mobile = mobile;
      employee.dob = dob;
      employee.doj = doj;
      await employee.save();
      return response
        .status(200)
        .json({ message: "Employee Updated", data: employee });
    }
  } catch (error) {
    return response.sendStatus(400);
  }
};

export const deleteEmployee = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { id } = request.params;
    await EmployeeModel.findByIdAndDelete({ _id: id });
    return response.status(200).json({ message: "Employee Deleted" });
  } catch (error) {
    return response.sendStatus(400);
  }
};
