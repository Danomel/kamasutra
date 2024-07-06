import { APIResponseType, ResultCodesEnum } from "../api/api";
import { usersAPI } from "../api/usersAPI";
import { actions, follow, unfollow } from "./users-reducer";

// jest.mock("../api/usersAPI", () => ({
//     usersAPI: {
//         follow: jest.fn()
//     }
// }));
jest.mock("../api/usersAPI")
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const dispatchMock = jest.fn();
const getStateMock = jest.fn();

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
};


test("Success follow thunk", async () => {
    usersAPIMock.follow.mockResolvedValue(result);
    const thunk = follow(1);
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toHaveBeenCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});

test("Success unfollow thunk", async () => {
    usersAPIMock.unfollow.mockResolvedValue(result);
    const thunk = unfollow(1);
    await thunk(dispatchMock, getStateMock, {});
    expect(dispatchMock).toHaveBeenCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});