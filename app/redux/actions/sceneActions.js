/**
 * @author Matan Zohar / matan.zohar@autodesk.com
 */
import {
    ADD_SCENE_COMPONENT,
    REMOVE_SCENE_COMPONENT,
    UPDATE_SCENE_COMPONENT,
    RESET_SCENE,
    UPDATE_PLAYBACK,
    UPDATE_DISPLAY,
    SET_RENDER_ELEMENT
} from 'constants/action-types';

import StoreAPI from 'StoreAPI';

export function addSceneComponent(component) {
    return {
        type: ADD_SCENE_COMPONENT,
        payload: component
    }
}

export function removeSceneComponent(component) {
    return {
        type: REMOVE_SCENE_COMPONENT,
        payload: component
    }
}

export function removeSceneComponentById(uuid) {
    return {
        type: REMOVE_SCENE_COMPONENT,
        payload: StoreAPI.getObjectById(uuid)
    }
}

export function updateSceneComponent(component) {
    return {
        type: UPDATE_SCENE_COMPONENT,
        payload: component
    }
}

export function resetScene() {
    return {
        type: RESET_SCENE,
        payload: {}
    }
}

export function updatePlayback(state) {
    return {
        type: UPDATE_PLAYBACK,
        payload: state
    }
}

export function updateDisplay(state) {
    return {
        type: UPDATE_DISPLAY,
        payload: state
    }
}

export function setRenderElement(state) {
    return {
        type: SET_RENDER_ELEMENT,
        payload: state
    }
}