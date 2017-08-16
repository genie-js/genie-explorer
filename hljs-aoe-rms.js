module.exports = (hljs) => {
  const conditionals = 'if elseif else endif start_random percent_chance end_random'
  const commands = 'create_object create_terrain create_elevation create_land create_player_lands create_connect_all_lands create_connect_all_players_land create_connect_teams_lands create_connect_same_land_zones'
  const directives = '#define #const #include #include_drs'
  const attributes = 'random_placement base_terrain min_number_of_cliffs max_number_of_cliffs min_length_of_cliff max_length_of_cliff cliff_curliness min_distance_cliffs min_terrain_distance'

  const SECTION = {
    className: 'section',
    begin: '<[A-Z_]+>'
  }

  const NUMBER = {
    className: 'number',
    begin: '(\\-|\\+)?\\d+'
  }

  return {
    keywords: {
      conditional,
      command,
      directive
    },
    contains: [
      hljs.COMMENT(
        '/\\*',
        '\\*/'
      ),
      SECTION,
      NUMBER,
    ]
  }
}
