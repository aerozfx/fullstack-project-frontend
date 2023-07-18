import React from "react";
import { shallow } from "enzyme";
import PlayerSearch from "./SearchPlayers";

describe("PlayerSearch", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PlayerSearch />);
    expect(wrapper).toMatchSnapshot();
  });
});
