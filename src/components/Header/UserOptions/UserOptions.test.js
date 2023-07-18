import React from "react";
import { shallow } from "enzyme";
import UserOptions from "./UserOptions";

describe("UserOptions", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<UserOptions />);
    expect(wrapper).toMatchSnapshot();
  });
});
