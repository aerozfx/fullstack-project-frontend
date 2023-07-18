import React from "react";
import { shallow } from "enzyme";
import MyPlayers from "./MyPlayers";

describe("MyPlayers", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MyPlayers />);
    expect(wrapper).toMatchSnapshot();
  });
});
