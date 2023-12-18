map = File
  .read('day18-1-input-sample.txt')
  .split("\n")
  .map{|l| l.split(" ")}
 
def vertices(m)
  # decode instructions into set of vertices and the len of the
  # outer edge (part of the area calculation too!)
  pts = [0, 0]
  edgelen = 0
  m.each do |dir, len, _|
    len = len.to_i
    edgelen += len
    pts.append [pts.last[0], pts.last[1] - len] if dir == 'U'
    pts.append [pts.last[0], pts.last[1] + len] if dir == 'D' 
    pts.append [pts.last[0] + len, pts.last[1]] if dir == 'R'
    pts.append [pts.last[0] - len, pts.last[1]] if dir == 'L'
  end
  p pts
  return pts, edgelen
end
 
def shoelace(pts, edgelen)
  # shoelace formula for calculating area
  p pts.each_cons(2).sum{|p1,p2| p2[0]*p1[1] - p2[1]*p1[0]}.abs/2
  p edgelen
  pts.each_cons(2).sum{|p1,p2| p2[0]*p1[1] - p2[1]*p1[0]}.abs/2 + edgelen/2 + 1
end
 
# part 1
p shoelace(*vertices(map))
 
# part 2
new = map.map do |_, _, hex|
  hex = hex[2..-2].hex # get rid of '(#' and ')'
  ["RDLU"[hex & 0xf], hex >> 4]
end
p shoelace(*vertices(new))
