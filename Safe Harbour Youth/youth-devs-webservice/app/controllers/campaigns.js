import CampaignsService from '../services/campaigns.js';
import {
    setResponse,
    setCreateResponse,
    setError,
  } from "./response-handler.js";

export const createCampaign = async (req, res) => {
    try {        
        const campaign = await CampaignsService.createCampaign(req.body);
        setCreateResponse(campaign, res);
    } catch (error) {
        console.log(error);
        setError(res);
    }
};

export const getCampaigns = async (req, res) => {
    try {
        const campaigns = await CampaignsService.getAllCampaigns();
        return setResponse(campaigns, res);
    } catch (error) {
        console.log(error);
        return setError(res, error);
    }
};

export const getCampaignById = async (req, res) => {
    try {
        const campaign = await CampaignsService.getCampaignById(req.params.id);
        return setResponse(campaign, res);
    } catch (error) {
        return setError(res, error);
    }
}

export const updateCampaign = async (req, res) => {
    try {
        const campaign = await CampaignsService.updateCampaign(req.params.id, req.body);
        return setResponse(campaign, res);
    } catch (error) {
        console.log(error);
        return setError(res, error);
    }
}

export const deleteCampaign = async (req, res) => {
    try {
        await CampaignsService.deleteCampaign(req.params.id);
        return setResponse({}, res);
    } catch (error) {
        console.log(error);
        return setError(res, error);
    }
}




