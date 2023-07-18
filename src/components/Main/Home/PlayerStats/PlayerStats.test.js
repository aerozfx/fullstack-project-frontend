import React from "react";
import { shallow } from "enzyme";
import PlayerStats from "./PlayerStats";

describe("PlayerStats", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PlayerStats />);
    expect(wrapper).toMatchSnapshot();
  });
});
