/* eslint-disable @typescript-eslint/no-explicit-any */
import { HealthCheckRating } from '../types';

export const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isStringArray = (object: any): object is string[] => {
  if (!object) return false;
  for (const element in object) {
    if (!isString(element)) return false;
  }
  return true;
};

export const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return !isNaN(Number(rating)) && rating in HealthCheckRating;
};