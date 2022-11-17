import AWS from 'aws-sdk';
import { extend } from 'lodash';

import AWS_SDK from '.';

const KoruIot = () => {
  const connect = (option: any) =>
    new Promise(resolve => {
      const iotSDK = new AWS_SDK(true);
      iotSDK.initClient(extend({ debug: false }, option));
      resolve(iotSDK);
    });

  const getListThing = (thingParam: any, callback?: any) => {
    const iotSDK = new AWS.Iot();
    iotSDK.listThings(thingParam, callback);
  };

  const createThing = (params: any, callback?: any) => {
    const iotSDK = new AWS.Iot();
    iotSDK.createThing(params, callback);
  };

  const searchIndex = (params: any, callback: any) => {
    const iotSDK = new AWS.Iot();
    iotSDK.searchIndex(params, callback);
  };

  const getIndexingConfiguration = (params: any, callback: any, groupName = '') => {
    const iotSDK = new AWS.Iot();
    iotSDK.getIndexingConfiguration(params, (err, data) => callback(err, data, groupName));
  };

  const listThingGroups = (params: any, callback: any) => {
    const iotSDK = new AWS.Iot();
    iotSDK.listThingGroups(params, callback);
  };

  const listJobs = (params: any, callback: any) => {
    const iotSDK = new AWS.Iot();
    iotSDK.listJobs(params, callback);
  };

  const updateThingShadow = (params: any, callback: any) => {
    const iotSDK = new AWS.IotData({
      endpoint: 'a3qnrsp444af6h-ats.iot.us-east-1.amazonaws.com',
    });
    iotSDK.updateThingShadow(params, callback);
  };

  const getJobDocument = (params: any, callback: any, jobId = '') => {
    const iotSDK = new AWS.Iot();
    iotSDK.getJobDocument(params, (err, data) => {
      callback(err, data, jobId);
    });
  };

  const getStatistics = (params: any, callback: any, id = '') => {
    const iotSDK = new AWS.Iot();
    iotSDK.getStatistics(params, (err, data) => callback(err, data, id));
  };

  const getBuckets = (params: any, callback: any, id = '') => {
    const iotSDK = new AWS.Iot();
    //@ts-ignore
    iotSDK.getBucketsAggregation(params, (err, data) => callback(err, data, id));
  };

  const updateThingGroup = (params: any, callback: any, id = '') => {
    const iotSDK = new AWS.Iot();
    iotSDK.updateThingGroup(params, (err, data) => callback(err, data, id));
  };

  const listJobExecutionsForThing = (params: any, callback: any, id = '') => {
    const iotSDK = new AWS.Iot();
    iotSDK.listJobExecutionsForThing(params, (err, data) => callback(err, data, id));
  };

  const listJobExecutionsForJob = (params: any, callback: any, id = '') => {
    const iotSDK = new AWS.Iot();
    iotSDK.listJobExecutionsForJob(params, (err, data) => callback(err, data, id));
  };

  const describeJob = (params: any, callback: any, id = '') => {
    const iotSDK = new AWS.Iot();
    iotSDK.describeJob(params, (err, data) => callback(err, data, id));
  };

  const listJobExecutionsForThingPromise = async (params: any, delay: any) => {
    const iotSDK = new AWS.Iot();
    try {
      await new Promise(res => setTimeout(res, delay));
      const data = await iotSDK.listJobExecutionsForThing(params).promise();
      return { ...data, thingName: params.thingName };
    } catch (err: any) {
      return { ...err, thingName: params.thingName };
    }
  };

  const getJobDocumentPromise = async (params: any) => {
    const iotSDK = new AWS.Iot();
    try {
      const data = await iotSDK.getJobDocument(params).promise();
      return { ...data, jobId: params.jobId };
    } catch (err: any) {
      return { ...err, jobId: params.jobId };
    }
  };

  const listThingGroupsPromise = async (params = {}) => {
    const iotSDK = new AWS.Iot();
    try {
      const data = await iotSDK.listThingGroups(params).promise();
      return data;
    } catch (err) {
      return err;
    }
  };
  const searchIndexPromise = async (params: any, delay = 0) => {
    const iotSDK = new AWS.Iot();
    try {
      await new Promise(res => setTimeout(res, delay));
      const data = await iotSDK.searchIndex(params).promise();
      return data;
    } catch (err) {
      return err;
    }
  };

  const getStatisticsPromise = async (params: any) => {
    const iotSDK = new AWS.Iot();
    try {
      const data = await iotSDK.getStatistics(params).promise();
      return data;
    } catch (error) {
      return 'error';
    }
  };

  const getBucketsPromise = async (params: any) => {
    const iotSDK = new AWS.Iot();
    try {
      //@ts-ignore
      const data = await iotSDK.getBucketsAggregation(params).promise();
      return data;
    } catch (error) {
      return 'error';
    }
  };

  const addThingToThingGroup = async (
    params: any,
    delay: any,
    action: any,
    removeGroup: any,
    thingGroupChilds: any,
  ) => {
    const iotSDK = new AWS.Iot();
    try {
      await new Promise(res => setTimeout(res, delay));
      const data = await iotSDK.addThingToThingGroup(params).promise();
      if (!!removeGroup) {
        const removeParams = {
          // thingGroupArn: removeGroup,
          thingName: params.thingName,
          thingGroupName: removeGroup,
        };
        removeThingFromThingGroup(removeParams, 50, action);
        thingGroupChilds.forEach((group: any) => {
          const paramChild = {
            // thingGroupArn: removeGroup,
            thingName: params.thingName,
            thingGroupName: group.thingGroupName,
          };
          removeThingFromThingGroup(paramChild, 50, action);
        });
      }
      return data;
    } catch (error) {
      action && action('Add thing to thing group fail');
    }
  };

  const removeThingFromThingGroup = async (params: any, delay: any, action: any) => {
    const iotSDK = new AWS.Iot();
    try {
      await new Promise(res => setTimeout(res, delay));
      const data = await iotSDK.removeThingFromThingGroup(params).promise();
      return data;
    } catch (error) {
      action && action('remove thing from thing group fail');
    }
  };

  const createThingPromise = async (params: any, delay: any) => {
    const iotSDK = new AWS.Iot();
    await new Promise(res => setTimeout(res, delay));
    return iotSDK.createThing(params).promise();
  };

  const deleteJobExecution = (params: any) => {
    const iotSDK = new AWS.Iot();
    return iotSDK.deleteJobExecution(params).promise();
  };

  const createThingGroupPromise = async (params: any, delay: any) => {
    const iotSDK = new AWS.Iot();
    await new Promise(res => setTimeout(res, delay));
    return iotSDK.createThingGroup(params).promise();
  };

  return {
    connect,
    getListThing,
    createThing,
    searchIndex,
    getIndexingConfiguration,
    listThingGroups,
    listJobs,
    updateThingShadow,
    getJobDocument,
    getStatistics,
    getBuckets,
    updateThingGroup,
    listJobExecutionsForThing,
    listJobExecutionsForJob,
    describeJob,
    listJobExecutionsForThingPromise,
    getJobDocumentPromise,
    listThingGroupsPromise,
    searchIndexPromise,
    getStatisticsPromise,
    getBucketsPromise,
    addThingToThingGroup,
    removeThingFromThingGroup,
    createThingPromise,
    deleteJobExecution,
    createThingGroupPromise,
  };
};

export default KoruIot();
